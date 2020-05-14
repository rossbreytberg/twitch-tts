#include "pch.h"
#include "TextToSpeechElement.h"

using namespace winrt;

namespace winrt::TwitchTTS::implementation {
  hstring TextToSpeechElement::GetText() noexcept {
    return text;
  }

  void TextToSpeechElement::SetText(hstring nextText) noexcept {
    text = nextText;
  }
}