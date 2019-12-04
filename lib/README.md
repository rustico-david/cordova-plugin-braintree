
## iOS

The iOS frameworks were built from the [Braintree SDK repo](https://github.com/braintree/braintree_ios ) on GitHub using Carthage.

The framework bundles in this directory were built from braintree_ios 4.30.2 and braintree-ios-drop-in 7.5.0.

To rebuild the frameworks for future versions, follow these steps:

```
mkdir /tmp/braintree-sdk
cd /tmp/braintree-sdk
echo 'github "braintree/braintree_ios"' > Cartfile
echo 'github "braintree/braintree-ios-drop-in"' >> Cartfile
carthage update
```

The framework bundles will be output to `/tmp/braintree-sdk/Carthage/Build/iOS`.

## Android

The Android libraries are obtained when the plugin is added via `src/android/buid-extras.gradle`.
