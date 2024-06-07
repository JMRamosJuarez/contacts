package com.contacts

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

data class Contact (val id: Int, val photo: String?, val name: String, val phones: List<String>) {

    fun toWritableMap(): WritableMap {
        return Arguments.createMap().apply {
            putInt("id", id)
            putString("photo", photo)
            putString("name", name)
            putArray("phones", Arguments.fromList(phones))
        }
    }
}
