package com.contacts

import android.database.Cursor
import android.provider.ContactsContract
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray

class ContactsModule(private val context: ReactApplicationContext): ReactContextBaseJavaModule(context) {

    private val contactsProjection: Array<out String> by lazy {
        arrayOf(
                ContactsContract.Contacts._ID,
                ContactsContract.Contacts.DISPLAY_NAME,
                ContactsContract.Contacts.PHOTO_URI,
        )
    }

    private val phonesProjection: Array<out String> by lazy {
        arrayOf(
                ContactsContract.CommonDataKinds.Phone._ID,
                ContactsContract.CommonDataKinds.Phone.NORMALIZED_NUMBER,
                ContactsContract.CommonDataKinds.Phone.ACCOUNT_TYPE_AND_DATA_SET,
                ContactsContract.CommonDataKinds.Phone.CONTACT_ID,
                ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME,
                ContactsContract.CommonDataKinds.Phone.PHOTO_URI,
        )
    }

    override fun getName(): String {
        return "ContactsModule"
    }

    @ReactMethod
    fun getContact(request: ReadableMap, promise: Promise) {
        try {

            val contactId = request.getInt("contactId")

            val contactsCursor = this.context.contentResolver.query(
                    ContactsContract.Contacts.CONTENT_URI,
                    this.contactsProjection,
                    "${ContactsContract.Contacts._ID} = ?",
                    arrayOf("$contactId"),
                    null
            )

            var contact: Contact? = null

            contactsCursor?.use { cursor ->
                val idIndex = cursor.getColumnIndex(ContactsContract.Contacts._ID)
                val photoUriIndex = cursor.getColumnIndex(ContactsContract.Contacts.PHOTO_URI)
                val nameIndex = cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME)

                while (cursor.moveToNext()) {
                    val id = cursor.getInt(idIndex)
                    val name = cursor.getString(nameIndex)
                    val photo = cursor.getString(photoUriIndex)
                    contact = Contact(id, name, photo)
                }
            }

            contact?.let {
                promise.resolve(it)
            } ?: run {
                promise.reject("contact-not-found", Exception("Contact not found"))
            }

        } catch (e: Exception) {
            promise.reject(e)
        }
    }

    @ReactMethod
    fun getContacts(request: ReadableMap, promise: Promise) {
        try {

            val page = request.getInt("page")

            val limit = request.getInt("limit")

            val offset = page * limit

            val contactsCursor = this.context.contentResolver.query(
                    ContactsContract.Contacts.CONTENT_URI,
                    this.contactsProjection,
                    null,
                    null,
                    "${ContactsContract.Contacts.DISPLAY_NAME} ASC LIMIT $limit OFFSET $offset"
            )

            val contacts = Arguments.createArray();

            contactsCursor?.use { cursor ->
                val idIndex = cursor.getColumnIndex(ContactsContract.Contacts._ID)
                val photoUriIndex = cursor.getColumnIndex(ContactsContract.Contacts.PHOTO_URI)
                val nameIndex = cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME)

                while (cursor.moveToNext()) {
                    val id = cursor.getInt(idIndex)
                    val name = cursor.getString(nameIndex)
                    val photo = cursor.getString(photoUriIndex)
                    val contact = Contact(id, name, photo)
                    contacts.pushMap(contact.toWritableMap())
                }
            }

            promise.resolve(contacts)
        } catch (e: Exception) {
            promise.reject("query-error", e)
        }
    }

    @ReactMethod
    fun getPhoneNumbers(request: ReadableMap, promise: Promise) {
        try {

            val contactId = request.getInt("contactId")

            val phonesCursor = this.context.contentResolver.query(
                    ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                    this.phonesProjection,
                    "${ContactsContract.CommonDataKinds.Phone.CONTACT_ID} = ?",
                    arrayOf("$contactId"),
                    "${ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME} ASC"
            )

            val phones = this.mapPhoneNumbers(phonesCursor)

            promise.resolve(phones)

        } catch (e: Exception) {
            promise.reject("query-error", e)
        }
    }

    @ReactMethod
    fun searchPhoneNumbers(request: ReadableMap, promise: Promise) {
        try {
            val query = request.getString("query")

            val phonesCursor = this.context.contentResolver.query(
                    ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                    this.phonesProjection,
                    "${ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME} LIKE ? OR ${ContactsContract.CommonDataKinds.Phone.NORMALIZED_NUMBER} LIKE ?",
                    arrayOf("%${query}%", "%${query}%"),
                    "${ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME} ASC"
            )

            val phones = this.mapPhoneNumbers(phonesCursor)

            promise.resolve(phones)

        } catch (e: Exception) {
            promise.reject("query-error", e)
        }
    }

    private fun mapPhoneNumbers(phonesCursor: Cursor?): WritableArray {
        val phones = Arguments.createArray();

        phonesCursor?.use { cursor ->

            val idIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone._ID)
            val phoneIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NORMALIZED_NUMBER)
            val accountIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.ACCOUNT_TYPE_AND_DATA_SET)

            val contactIdIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.CONTACT_ID)
            val displayNameIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME)
            val photoUriIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.PHOTO_URI)

            while (cursor.moveToNext()) {

                val cId = cursor.getInt(contactIdIndex)
                val displayName = cursor.getString(displayNameIndex)
                val photoUri = cursor.getString(photoUriIndex)

                val contact = Contact(cId, displayName, photoUri)

                val phoneId = cursor.getInt(idIndex)
                val phoneNumber = cursor.getString(phoneIndex)
                val account = cursor.getString(accountIndex)

                val phone = PhoneNumber(phoneId, account, phoneNumber, contact)
                phones.pushMap(phone.toWritableMap())
            }
        }

        return phones
    }
}
