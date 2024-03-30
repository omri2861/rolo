# Rolo Dev Log

## 2024-30-03 and earlier

Building the app was very annoying. Since I'm using my old laptop, it's not strong enough to run an android emulator, and I wanted to use my personal phone.

First, I tried converting the code to use expo, then use it using the Expo Go app. There were some troubles there, not just because expo itself. But the most
basic issue was that the API version for this app isn't supported by Expo GO (too old), and trying to convert without building first seemed unwise.

This is what I learned after a successful build:
1. Running the app on your personal phone doesn't necessarily have to be with Expo. You can use `adb` via Wi-Fi or cable, and you can do these for
   react native applications as well.
2. The `conext_launcher` application, which I'm based on, has an android native module written in Java, to expose some native-only API through react native.
   This kinda makes you wonder if react native is relevant at all here, but we'll start and see how it goes. The important part is, that when you get an error
   that the native module is `null` - this means that it's build failed (or you didn't build at all).
3. Android studio is required to build the native part of the package, and also helps connecting to devices using `adb` and installing all the required dependencies. It's a shame to admit, but it's probably needed, even if you're using react native.

### Building The Project

First, run `npm install ci`, as said in the original `README.md` file.

Then, we'd like to build the native package - once SDK version 49 is installed via android studio, along with other requried dependencies,
run

```shell
cd android
ANDROID_HOME=/path/to/android/sdk ./gradlew build
```

This will take a while and will fail, eventually, because the final step of the build tries to publish the package.

That's OK though, because the native package itself should be built.

Finally, run the development server - `npm run start:server`. Then, hit `a`
to connect to an android device and run the application.


### Starting the Project

Ultimately, the most basic parameter for showing apps based on routines is
by using the time of day.

I can start by creating a view for all the apps, in pages. Then, I can
add an example filter, to show allowed apps only.

The next step would be to store some rules in a database, maybe per-app and
maybe system-wide. But that will take quite some time.
