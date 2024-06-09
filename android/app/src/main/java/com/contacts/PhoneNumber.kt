package com.contacts

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

data class PhoneNumber (val id: Int, val account: String, val phone: String, val contact: Contact) {

    fun toWritableMap(): WritableMap {
        return Arguments.createMap().apply {
            putInt("id", id)
            putString("account", account)
            putString("phone", phone)
            putMap("contact", contact.toWritableMap())
        }
    }
}
