package com.contacts

import android.provider.ContactsContract
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class ContactsModule(private val context: ReactApplicationContext): ReactContextBaseJavaModule(context) {

    private val projection: Array<out String> by lazy {
        arrayOf(
                ContactsContract.Data.CONTACT_ID,
                ContactsContract.CommonDataKinds.Photo.PHOTO_URI,
                ContactsContract.Data.DISPLAY_NAME,
                ContactsContract.CommonDataKinds.Phone.NUMBER,
        )
    }

    private val defaultSelection: String by lazy {
        "${ContactsContract.Data.MIMETYPE} = ?"
    }

    private val defaultArgs: Array<String> by lazy {
        arrayOf(
                ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE,
        )
    }


    override fun getName(): String {
        return "ContactsModule"
    }

    @ReactMethod
    fun getContacts(request: ReadableMap, promise: Promise) {
        try {

            val query = request.getString("query")?.trim() ?: "";

            val searchBy = "(${ContactsContract.Data.DISPLAY_NAME} LIKE ? OR ${ContactsContract.CommonDataKinds.Phone.NUMBER} LIKE ?)"

            val selection =
                    if (query.isNotEmpty())
                        "${this.defaultSelection} AND $searchBy"
                    else this.defaultSelection

            val args = if (query.isNotEmpty()) this.defaultArgs.plus(arrayOf("%${query}%", "%${query}%")) else this.defaultArgs

            val contactsCursor = this.context.contentResolver.query(
                    ContactsContract.Data.CONTENT_URI,
                    this.projection,
                    selection,
                    args,
                    "${ContactsContract.Data.DISPLAY_NAME} ASC"
            )

            val models = mutableListOf<ContactModel>()

            contactsCursor?.use { cursor ->
                val idIndex = cursor.getColumnIndex(ContactsContract.Data.CONTACT_ID)
                val photoUriIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Photo.PHOTO_URI)
                val nameIndex = cursor.getColumnIndex(ContactsContract.Data.DISPLAY_NAME)
                val phoneIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER)

                while (cursor.moveToNext()) {
                    val id = cursor.getInt(idIndex)
                    val photo = cursor.getString(photoUriIndex)
                    val name = cursor.getString(nameIndex)
                    val phone = cursor.getString(phoneIndex)
                    val contact = ContactModel(id, photo, name, phone)
                    models.add(contact)
                }
            }

            val contacts = Arguments.createArray();

            models.groupBy { it.id }.forEach { (id, items) ->
                val current = items.first();
                val phones = items.mapNotNull { it.phone }
                val contact = Contact(id, current.photo, current.name, phones)
                contacts.pushMap(contact.toWritableMap())
            }

            promise.resolve(contacts)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }
}
