#include "pch.h"
#include "winrt/Windows.UI.Xaml.h"
#include "winrt/Windows.UI.Xaml.Controls.h"
#include "JSValueReader.h"
#include "NativeModules.h"
#include "TextToSpeechElement.h"
#include "TextToSpeechViewManager.h"

using namespace winrt;
using namespace winrt::TwitchTTS::implementation;
using namespace winrt::Windows::UI::Xaml;
using namespace winrt::Windows::UI::Xaml::Controls;

namespace winrt::TwitchTTS::implementation {

  // IViewManager

  hstring TextToSpeechViewManager::Name() noexcept {
    return L"TextToSpeech";
  }

  FrameworkElement TextToSpeechViewManager::CreateView() noexcept {
    return TextToSpeechElement();
  }

  // IViewManagerWithNativeProperties

  IMapView<hstring, ViewManagerPropertyType> TextToSpeechViewManager::NativeProps() noexcept {
    auto nativeProps = single_threaded_map<hstring, ViewManagerPropertyType>();
    nativeProps.Insert(L"text", ViewManagerPropertyType::String);
    return nativeProps.GetView();
  }

  void TextToSpeechViewManager::UpdateProperties(
    FrameworkElement const& view,
    IJSValueReader const& propertyMapReader) noexcept {
    if (auto element = view.try_as<TextToSpeechElement>()) {
      const JSValueObject& propertyMap = JSValue::ReadObjectFrom(propertyMapReader);
      hstring const& prevText = element.GetText();
      hstring nextText;
      for (auto const& pair : propertyMap) {
        auto const& propertyName = pair.first;
        auto const& propertyValue = pair.second;
        if (propertyName == "text") {
          nextText = to_hstring(propertyValue.String());
          element.SetText(nextText);
        }
      }
    }
  }
}