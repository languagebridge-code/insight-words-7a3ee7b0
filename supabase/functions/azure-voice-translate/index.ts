import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audio, targetLanguage = 'fa' } = await req.json();

    if (!audio) {
      throw new Error('No audio data provided');
    }

    const speechApiKey = Deno.env.get('AZURE_SPEECH_API_KEY');
    const speechRegion = Deno.env.get('AZURE_SPEECH_REGION');
    const translatorApiKey = Deno.env.get('AZURE_TRANSLATOR_API_KEY');
    const translatorRegion = Deno.env.get('AZURE_TRANSLATOR_REGION');

    if (!speechApiKey || !speechRegion || !translatorApiKey || !translatorRegion) {
      throw new Error('Azure credentials not configured');
    }

    // Convert base64 to binary
    const binaryAudio = Uint8Array.from(atob(audio), c => c.charCodeAt(0));

    // Step 1: Speech-to-Text using Azure
    const speechToTextUrl = `https://${speechRegion}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`;
    
    const speechResponse = await fetch(speechToTextUrl, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': speechApiKey,
        'Content-Type': 'audio/wav',
      },
      body: binaryAudio,
    });

    if (!speechResponse.ok) {
      const errorText = await speechResponse.text();
      console.error('Azure Speech API error:', errorText);
      throw new Error(`Speech-to-Text failed: ${speechResponse.statusText}`);
    }

    const speechResult = await speechResponse.json();
    const transcribedText = speechResult.DisplayText || speechResult.NBest?.[0]?.Display || '';

    if (!transcribedText) {
      throw new Error('No speech detected in audio');
    }

    console.log('Transcribed text:', transcribedText);

    // Step 2: Translate using Azure Translator
    const translatorUrl = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLanguage}`;
    
    const translateResponse = await fetch(translatorUrl, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': translatorApiKey,
        'Ocp-Apim-Subscription-Region': translatorRegion,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ text: transcribedText }]),
    });

    if (!translateResponse.ok) {
      const errorText = await translateResponse.text();
      console.error('Azure Translator API error:', errorText);
      throw new Error(`Translation failed: ${translateResponse.statusText}`);
    }

    const translateResult = await translateResponse.json();
    const translatedText = translateResult[0]?.translations?.[0]?.text || '';

    console.log('Translated text:', translatedText);

    // Step 3: Text-to-Speech for the translation
    const ttsUrl = `https://${speechRegion}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const ssml = `<speak version='1.0' xml:lang='fa-IR'>
      <voice xml:lang='fa-IR' name='fa-IR-DilaraNeural'>
        ${translatedText}
      </voice>
    </speak>`;

    const ttsResponse = await fetch(ttsUrl, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': speechApiKey,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
      },
      body: ssml,
    });

    if (!ttsResponse.ok) {
      const errorText = await ttsResponse.text();
      console.error('Azure TTS API error:', errorText);
      throw new Error(`Text-to-Speech failed: ${ttsResponse.statusText}`);
    }

    const audioBuffer = await ttsResponse.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

    return new Response(
      JSON.stringify({
        transcript: transcribedText,
        translation: translatedText,
        audioContent: base64Audio,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in azure-voice-translate:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
