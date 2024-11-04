package com.indiasportshub

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.content.Intent
import android.net.Uri
import android.os.Bundle


class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "ish"

  override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)
        handleDeepLink(intent)
    }

    private fun handleDeepLink(intent: Intent?) {
        val action: String? = intent?.action
        val data: Uri? = intent?.data

        // Handle the deep link URL here
        data?.let {
            // Example: if you want to navigate based on the deep link
            val deepLinkUrl = it.toString()
            // Log or handle the URL
        }
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        setIntent(intent)
        handleDeepLink(intent)
    }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
