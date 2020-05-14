#include "pch.h"
#include "ReactPackageProvider.h"
#include "NativeModules.h"
#include "NativeComponents/TextToSpeech/TextToSpeechViewManager.h"


using namespace winrt::Microsoft::ReactNative;

namespace winrt::TwitchTTS::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
    AddAttributedModules(packageBuilder);
    packageBuilder.AddViewManager(L"TextToSpeechViewManager", []() { return winrt::make<TextToSpeechViewManager>(); });
}

} // namespace winrt::TwitchTTS::implementation


