package com.pidelo_tu_client;

import android.app.Application;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactApplication;
import com.RNOpenpay.RNOpenpayPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication{
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNOpenpayPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new ReactNativeOneSignalPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new MapsPackage()
        );
      }

      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
    }

    @Override
    public void onCreate() {
      super.onCreate();
      SoLoader.init(this, /* native exopackage */ false);
    }

}
