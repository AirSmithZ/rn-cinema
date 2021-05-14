#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
#import <AVFoundation/AVFoundation.h>  // import

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];  // allow
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"rn2"
                                            initialProperties:nil];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(alwaysVisible) {
    [self setrefsAutoHidden:NO];
}

RCT_EXPORT_METHOD(autoHidden) {
    [self setrefsAutoHidden:YES];
}
@end
@implementation HomeIndicatorView

- (BOOL)prefersHomeIndicatorAutoHidden {
    return self.refsAutoHidden;
}

@end


@implementation RNIndicator

- (id) init {
    [self setrefsAutoHidden:NO];
    return [super init];
}

- (void) setrefsAutoHidden: (BOOL) newValue {
    HomeIndicatorView *rootViewController = [self getHomeIndicatorView];

    rootViewController.refsAutoHidden = newValue;
    if (@available(iOS 11.0, *)) {
        [rootViewController setNeedsUpdateOfHomeIndicatorAutoHidden];
    }
}

- (HomeIndicatorView*) getHomeIndicatorView {
    UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
    NSAssert(
        [rootViewController isKindOfClass:[HomeIndicatorView class]],
        @"rootViewController is not of type HomeIndicatorView as expected."
    );
    return (HomeIndicatorView*) rootViewController;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(alwaysVisible) {
    [self setrefsAutoHidden:NO];
}

RCT_EXPORT_METHOD(autoHidden) {
    [self setrefsAutoHidden:YES];
}

@end