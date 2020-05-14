#pragma once

#include "pch.h"

using namespace winrt;
using namespace winrt::Windows::UI::Xaml::Controls;

namespace winrt::TwitchTTS::implementation {
  struct TextToSpeechElement : MediaPlayerElement {
  
    public:
      TextToSpeechElement() = default;
      hstring GetText();
      void SetText(hstring text);

    private:
      hstring text;
  };
}