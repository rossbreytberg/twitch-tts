#pragma once

#include "pch.h"
#include "winrt/Windows.UI.Xaml.Controls.h"
#include "TextToSpeechElement.g.h"

using namespace winrt;
using namespace winrt::Windows::UI::Xaml::Controls;

namespace winrt::TwitchTTS::implementation {
  struct TextToSpeechElement : TextToSpeechElementT<TextToSpeechElement> {
  
    public:
      TextToSpeechElement() = default;
      hstring GetText() noexcept;
      void SetText(hstring text) noexcept;

    private:
      hstring text;
  };
}

namespace winrt::TwitchTTS::factory_implementation {
  struct TextToSpeechElement : TextToSpeechElementT<TextToSpeechElement, implementation::TextToSpeechElement> {};
}