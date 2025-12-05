package com.myautostartapp

import android.app.Activity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AppKillerModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "AppKillerModule"
  }

  @ReactMethod
  fun killApp() {
    android.os.Process.killProcess(android.os.Process.myPid())
  }

  @ReactMethod
  fun moveToBackground() {
    val activity: Activity? = reactApplicationContext.currentActivity
    activity?.moveTaskToBack(true)
  }
}
