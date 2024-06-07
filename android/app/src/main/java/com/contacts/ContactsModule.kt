package com.contacts

import android.Manifest
import android.content.pm.PackageManager
import android.provider.ContactsContract
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.ReactActivity
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.PermissionListener

class ContactsModule(private val context: ReactApplicationContext): ReactContextBaseJavaModule(context) {

    private val projection: Array<out String> by lazy {
        arrayOf(
                ContactsContract.Data.CONTACT_ID,
                ContactsContract.CommonDataKinds.Photo.PHOTO_URI,
                ContactsContract.Data.DISPLAY_NAME,
                ContactsContract.CommonDataKinds.Email.ADDRESS,
                ContactsContract.CommonDataKinds.Phone.NUMBER,
        )
    }

    private val selection: String by lazy {
        "${ContactsContract.Data.MIMETYPE} = ? OR ${ContactsContract.Data.MIMETYPE} = ? OR ${ContactsContract.Data.MIMETYPE} = ?"
    }

    private val args: Array<String> by lazy {
        arrayOf(
                ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE,
                ContactsContract.CommonDataKinds.Email.CONTENT_ITEM_TYPE,
                ContactsContract.CommonDataKinds.Photo.CONTENT_ITEM_TYPE
        )
    }


    override fun getName(): String {
        return "ContactsModule"
    }

    @ReactMethod
    fun getContacts(promise: Promise) {
        try {

            val contactsCursor = this.context.contentResolver.query(
                    ContactsContract.Data.CONTENT_URI,
                    this.projection,
                    this.selection,
                    this.args,
                    "${ContactsContract.Data.DISPLAY_NAME} ASC"
            )

            val models = mutableListOf<ContactModel>()

            contactsCursor?.use { cursor ->
                val idIndex = cursor.getColumnIndex(ContactsContract.Data.CONTACT_ID)
                val photoUriIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Photo.PHOTO_URI)
                val nameIndex = cursor.getColumnIndex(ContactsContract.Data.DISPLAY_NAME)
                val emailIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Email.ADDRESS)
                val phoneIndex = cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER)

                while (cursor.moveToNext()) {
                    val id = cursor.getInt(idIndex)
                    val photo = cursor.getString(photoUriIndex)
                    val name = cursor.getString(nameIndex)
                    val email = cursor.getString(emailIndex)
                    val phone = cursor.getString(phoneIndex)
                    val contact = ContactModel(id, photo, name, email, phone)
                    models.add(contact)
                }
            }

            val contacts = Arguments.createArray();

            models.groupBy { it.id }.map { (id, items) ->
                val current = items.first();
                val phones = items.mapNotNull { it.phone }
                val contact = Contact(id, current.photo, current.name, current.email, phones)
                contacts.pushMap(contact.toWritableMap())
            }

            promise.resolve(contacts)
        } catch (e: Exception) {
            promise.reject(e)
        }
    }
}
