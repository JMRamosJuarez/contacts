package com.contacts

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

data class Contact (val id: Int, val name: String, val photo: String?) {

    fun toWritableMap(): WritableMap {
        return Arguments.createMap().apply {
            putInt("id", id)
            putString("name", name)
            putString("photo", photo)
        }
    }
}
