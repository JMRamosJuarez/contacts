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
                ContactsContract.CommonDataKinds.Phone.CONTACT_ID,
                ContactsContract.CommonDataKinds.Phone.PHOTO_URI,
                ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME,
                ContactsContract.CommonDataKinds.Phone.NUMBER,
        )
    }

    override fun getName(): String {
        return "ContactsModule"
    }

    @ReactMethod
    fun getContacts(request: ReadableMap, promise: Promise) {
        try {

            val query = request.getString("query")?.trim() ?: "";

            val searchBy = "${ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME} LIKE ? OR ${ContactsContract.CommonDataKinds.Phone.NUMBER} LIKE ?"

            val selection =
                    if (query.isNotEmpty())
                        searchBy
                    else null

            val args = if (query.isNotEmpty()) arrayOf("%${query}%", "%${query}%") else null

            val contactsCursor = this.context.contentResolver.query(
                    ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                    this.projection,
                    selection,
                    args,
                    "${ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME} ASC"
            )

            val models = mutableListOf<ContactModel>()

            contactsCursor?.use { cursor ->
                val idIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.CONTACT_ID)
                val photoUriIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.PHOTO_URI)
                val nameIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME)
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
