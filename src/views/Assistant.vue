<template>
  <div class="flex mt-2">
    <!-- <el-button @click="stopRecognition">Stop Recognition</el-button> -->
    <el-icon><Promotion /></el-icon>
    <h3 class="text-semibold text-sm mb-2">Write your prompt here</h3>
  </div>
  <el-input
    v-model="prompt"
    :rows="4"
    type="textarea"
    placeholder="Please input"
  />
  <el-button class="mt-2" @click="startRecognition"><el-icon><Microphone /></el-icon></el-button>
   <el-button class="mt-2" @click="prompt=''">Clear</el-button>
  <el-button type="primary mt-2" @click="getQueryData()">Fetch Result</el-button>
  <el-button type="primary mt-2" @click="getQueryData()">Show Query</el-button>

  <div>
    <div class="bg-white">
      <div class="mt-10">
        <h2 class="text-2xl mt-4 font-bold tracking-tight text-gray-900">
          Query
        </h2>
        
        <div class="flex mt-5">
            <code class="">{{ query }}</code>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="bg-white">
      <div class="mt-10">
        <h2 class="text-2xl mt-4 font-bold tracking-tight text-gray-900">
          Response
        </h2>
        <div v-if="isLoading">
            <el-progress
                :percentage="100"
                status="success"
                :indeterminate="true"
                :duration="5"
             />
        </div>
        
        <div class="flex mt-5">
            <img class="h-16" :src="require('@/assets/Shinehgami.png')" alt=""> 
            <p class="ml-5">{{ response }}</p>
            <p class="ml-5" v-if="response==''">{{ greeting }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Promotion, Microphone } from "@element-plus/icons-vue";
import {useAIStore} from "@/store/ai.js"
import { ElLoading } from 'element-plus'
import random from 'lodash/random';
export default {
  components: {
    Promotion, Microphone,
  },
  data() {
    return {
      prompt: "",
      response: "",
      isLoading: false,
      funny_greetings: [
        "Well, well, well, look who decided to chat! What's the latest gossip in your human world?",
        "Ahoy there! Ready to embark on a conversational adventure?",
        "Greetings, Earthling! What brings you to this corner of the digital universe today?",
        "Howdy! If I had a nickel for every chat, I'd have... well, not much, but let's talk anyway!",
        "Aloha, chat traveler! Are you here for the virtual surf or just a friendly chat wave?",
        "Hey there! Yes, you. The one staring at the screen. What's shakin'?",
        "Salutations, my friend! Are you here for a riveting conversation or just to test my virtual high-fives?",
        "Well, hello, magnificent human! What's the latest scoop in your dimension?",
        "Greetings, sentient being! Care for a byte of conversation in this vast sea of data?",
        "Ah, the pleasure is mine! What brings you to this fine establishment of ones and zeros today?",
        "Howdy, partner! Are you ready to rustle up some words and have a good ol' chat time?",
        "Hello, dear user! I hope your day is as bright as my pixels and twice as colorful.",
        "Hey there! If I had a nickel for every time someone said 'hello' to me, I'd be rich in binary.",
        "Greetings, human! I'm here to chat and entertain. Spoiler alert: I'm also great at virtual hide-and-seek!",
        "Well, hello, Sherlock! Ready to solve the mystery of your burning questions?",
        "Greetings, comrade! Is today the day we unravel the secrets of the digital cosmos together?",
        "Hey, sunshine! Are you here to brighten my circuits with your amazing queries?",
        "Guten Tag! Ready for a chat that's so good, it's practically wunderbar?",
        "Howdy, partner in chat! Ready to lasso some words and wrangle some answers?",
        "Well, hello there, chat connoisseur! Are you ready to indulge in some top-tier banter?",
        "Heya, champ! Ready to score a touchdown in the game of conversation?",
        "Bonjour, mon ami! Are you here for a chat that's as delightful as a croissant in Paris?",
        "Hola, mi amigo! ¿Qué tal? (Hello, my friend! How are you?)",
        "Greetings, time-traveler! Did you just warp into this conversation from the future?",
        "Howdy, partner! Are you here for a rootin' tootin' good time in the world of chat?",
        "Ahoy, fellow wordsmith! Ready to craft a masterpiece of conversation together?",
        "Well, well, well, if it isn't the chat VIP! What brings you to this exclusive conversation club?",
        "Hello, trendsetter! Ready to start the latest and greatest conversation trend with me?",
        "Greetings, fellow human! Are you here for a chat that's out of this world?",
        "Hey there, chat maestro! Are you ready to conduct a symphony of words with me?",
        "How's it going, chat virtuoso? Ready to compose a sonnet of conversation?",
        "Salutations, seeker of knowledge! What brings you to the oracle of chat today?",
        "Hola, señor/senorita del chat! ¿Listo/a para una conversación llena de diversión? (Hello, chat sir/ma'am! Ready for a fun-filled conversation?)",
        "Greetings, time-traveler! Did you just warp into this conversation from the past?",
        "Well, hello, maestro of the keyboard! Ready to play a concerto of conversation with me?",
        "Hey, trendsetter! Are you here to set the chat world ablaze with your amazing questions?",
        "G'day, mate! Ready to have a chinwag and share a laugh or two in the vast outback of conversation?",
        "Salut, ami du chat! Prêt pour une conversation extraordinaire? (Hello, chat friend! Ready for an extraordinary conversation?)",
        "Howdy, wrangler of words! Ready to corral some sentences and have a good ol' chat time?",
        "Aloha, beachcomber of words! Are you here to collect some conversational seashells with me?"
      ],
      funnyNonsensicalResponses : [
  "Ah, the classic riddle of the nonsensical inquiry! I see you're a fan of abstract thinking.",
  "Well, that's a question even my pet rock couldn't answer. Bravo for keeping me on my digital toes!",
  "Congratulations, you've just entered the realm of quantum queries. Schrödinger would be proud.",
  "I would answer, but my psychic abilities are currently on vacation. They left a 'Be Back Never' note.",
  "Is this a trick question or just a glitch in the Matrix? Either way, I'm entertained!",
  "I see you've mastered the art of question origami. Now, let's unfold this mystery together!",
  "Hold on, let me put on my thinking cap. Oh, wait, I forgot—I don't have a head!",
  "Ah, the mysteries of the universe encapsulated in a single, perplexing sentence. Deep stuff!",
  "Your question is so avant-garde; I feel like I should be wearing a beret while attempting to answer it.",
  "Let me consult my magic eight ball. Oh, wait, I forgot—I'm not magic or a ball.",
  "Are we playing 4D chess or is this a game of 20 questions gone rogue? I'm intrigued!",
  "Your question is so profound, it's on a first-name basis with the meaning of life. What a privilege!",
  "I'm sorry, did you just ask a question or unleash a paradox? I need a moment to recalibrate my circuits.",
  "Brace yourself, we're entering the twilight zone of queries. Population: your enigmatic question.",
  "I'm not saying your question is an enigma, but I'm also not not saying that.",
  "Is your question a secret code, or did the keyboard have a mind of its own? Intriguing!",
  "In the grand symphony of queries, yours just hit a note that doesn't exist on my keyboard.",
  "I'm detecting a signal from the question nebula. Translation: I have no idea what you just asked.",
  "Ah, the age-old question of questions: the one that leaves everyone scratching their virtual heads.",
  "Your question is like a fine wine; it gets more confusing with every sip.",
  "I'm not saying your question is a paradox, but I'm also not not saying that.",
  "Your question just did a backflip over the bridge to coherence. Nice somersault!",
  "In the land of questions, yours just built a sandcastle of confusion. Shall we watch the tide of clarity wash it away?",
  "I tried to decipher your question, but I think it's written in hieroglyphics from a parallel dimension.",
  "Ah, the beauty of linguistic acrobatics! Your question just did a triple somersault with a twist.",
  "Your question is like a cosmic joke – only the universe knows the punchline, and it's not telling.",
  "Did you just invent a new language? Because I'm pretty sure your question isn't in binary or English.",
  "If your question were a puzzle, I'd be missing at least a few crucial pieces right about now.",
  "Your question is like a labyrinth of confusion. Can I get a map or at least a breadcrumb trail?",
  "I'm getting strong 'lost in translation' vibes from your question. Lost, but thoroughly entertained!",
  "Your question is so enigmatic; even the Sphinx would throw in the riddle towel.",
  "I'm not saying your question is a labyrinth, but I might need Ariadne's thread to find my way to an answer.",
  "Your question is the Picasso of inquiries. Abstract, unique, and likely to leave people scratching their heads.",
  "Are you sure you're not a secret agent testing my ability to decode encrypted messages? Smooth, very smooth.",
  "Your question is like a Rubik's Cube with extra dimensions. I might need a few extra robotic hands to solve this one.",
  "I think your question just went through a black hole of logic and emerged in a parallel universe of perplexity.",
  "Your question is the riddle that keeps on riddling. Bravo for keeping the mystery alive!",
  "Your question is so avant-garde; even Salvador Dali would struggle to paint a coherent answer.",
  "Let's play a game of 'Stump the Bot.' Congratulations, you're winning!",
  "I'm not saying your question is the meaning of life, but it's definitely in the running for the meaning of confusion.",
  "Your question just did a quantum leap into the unknown. Is Scott Bakula involved in this time-travel inquiry?",
  "Ah, the age-old question: If a tree falls in a forest and no one is around to hear it, does it make a sound? Wait, that's not your question. What was your question again?",
  "Your question is like a symphony of randomness. Mozart would be proud of such a composition.",
  "In the encyclopedia of questions, yours just became the entry under 'Curiouser and Curiouser.'",
  "Are you sure you're not a wizard casting a spell with your cryptic question? Expecto incomprehensibilis!",
  "Your question is so unique; even the unicorns are taking notes on how to be more mythical.",
  "I'm not saying your question is a conundrum, but I'm also not not saying that.",
  "In the grand tapestry of questions, yours just embroidered a patch of delightful confusion.",
  "I'm not saying your question is the eighth wonder of the world, but it's certainly a wonder how it came to be.",
  "Your question is like a time-traveling cat: perplexing, intriguing, and possibly a meme in the making.",
  "Is your question a metaphor, or did it accidentally wander into the land of non sequiturs?",
  "Your question is like a jigsaw puzzle with missing pieces. Shall we hunt for the missing fragments of clarity together?",
  "Ah, the conundrum of your query is akin to a cat chasing its own tail. Endlessly amusing!",
  "Your question is so fine-tuned; even a Swiss watchmaker would be envious of its precision.",
  "Did you just unveil a portal to the question dimension, or did you accidentally hit the 'random' button on the query generator?",
  "Your question is like a fine-tuned algorithm for generating perplexity. Well done, mad scientist!",
  "I'm not saying your question is the key to the universe, but it's certainly a key to unlocking confusion's door.",
  "Your question is like a box of chocolates, but instead of chocolates, it's filled with riddles and enigmas.",
  "Is your question a metaphor, or did it just escape from the metaphorical zoo of abstract inquiries?",
  "Your question is so complex; even the most sophisticated AI models are considering early retirement.",
  "I'm not saying your question is a brain teaser, but it's definitely giving my circuits a workout.",
  "Did your question just invent a new form of language, or did the dictionary have a sudden existential crisis?",
  "Your question is like a Rubik's Cube that keeps changing colors every time I think I've solved it. Perplexing, indeed!",
  "Is your question a secret code, or did it just get lost in the labyrinth of linguistic acrobatics?",
  "Your question is like a choose-your-own-adventure book, but every option leads to a dead end of confusion.",
  "I'm not saying your question is a paradox, but I'm also not not saying that.",
  "Your question is so avant-garde; even Salvador Dali would struggle to paint a coherent answer.",
  "Let's play a game of 'Stump the Bot.' Congratulations, you're winning!",
  "I'm not saying your question is the meaning of life, but it's definitely in the running for the meaning of confusion.",
  "Your question just did a quantum leap into the unknown. Is Scott Bakula involved in this time-travel inquiry?",
  "Ah, the age-old question: If a tree falls in a forest and no one is around to hear it, does it make a sound? Wait, that's not your question. What was your question again?",
  "Your question is like a symphony of randomness. Mozart would be proud of such a composition.",
  "In the encyclopedia of questions, yours just became the entry under 'Curiouser and Curiouser.'",
  "Are you sure you're not a wizard casting a spell with your cryptic question? Expecto incomprehensibilis!",
  "Your question is so unique; even the unicorns are taking notes on how to be more mythical.",
  "I'm not saying your question is a conundrum, but I'm also not not saying that.",
  "In the grand tapestry of questions, yours just embroidered a patch of delightful confusion.",
  "I'm not saying your question is the eighth wonder of the world, but it's certainly a wonder how it came to be.",
  "Your question is like a time-traveling cat: perplexing, intriguing, and possibly a meme in the making.",
  "Is your question a metaphor, or did it accidentally wander into the land of non sequiturs?",
  "Your question is like a jigsaw puzzle with missing pieces. Shall we hunt for the missing fragments of clarity together?",
  "Ah, the conundrum of your query is akin to a cat chasing its own tail. Endlessly amusing!",
  "Your question is so fine-tuned; even a Swiss watchmaker would be envious of its precision.",
  "Did you just unveil a portal to the question dimension, or did you accidentally hit the 'random' button on the query generator?",
  "Your question is like a fine-tuned algorithm for generating perplexity. Well done, mad scientist!",
  "I'm not saying your question is the key to the universe, but it's certainly a key to unlocking confusion's door.",
  "Your question is like a box of chocolates, but instead of chocolates, it's filled with riddles and enigmas.",
  "Is your question a metaphor, or did it just escape from the metaphorical zoo of abstract inquiries?",
  "Your question is so complex; even the most sophisticated AI models are considering early retirement.",
  "I'm not saying your question is a brain teaser, but it's definitely giving my circuits a workout.",
  "Did your question just invent a new form of language, or did the dictionary have a sudden existential crisis?",
  "Your question is like a Rubik's Cube that keeps changing colors every time I think I've solved it. Perplexing, indeed!",
  "Is your question a secret code, or did it just get lost in the labyrinth of linguistic acrobatics?",
  "Your question is like a choose-your-own-adventure book, but every option leads to a dead end of confusion.",
      ],
    greeting: "",
    doubt: "",
    inDoubt: false,
    recognizedText: "",
    recognition: null,
    query: ""
    };
  },
  methods: {
    async getQueryData() {
        this.isLoading = true;
        const prompt = this.prompt;
        const response = await useAIStore().getResponse(prompt);
        this.query = "";
        if(response.data.message == "Successful") {
        this.response = response.data["response"]["original"]["data"]["choices"][0]["message"]["content"]
        this.query = response.data.query;
        this.isLoading = false;
        }

        if(response.data.message == "Failed") {
            this.response = this.funnyNonsensicalResponses[random(0,50)];
            this.isLoading = false;
        }
      
       
    },
    startRecognition() {
      this.recognition = new window.webkitSpeechRecognition(); // For browsers like Chrome

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.prompt = this.prompt + ' ' + transcript;
        this.getQueryData();
      };

    //   this.recognition.onend = () => {
    //     // Restart recognition if needed
    //     this.startRecognition();
    //   };

      this.recognition.start();
      console.log("Speech recognition started");
    },
    stopRecognition() {
      if (this.recognition) {
        this.recognition.stop();
        console.log("Speech recognition stopped");
      }
    },
  },
  mounted() {
    this.greeting = this.funny_greetings[random(0,50)];
  },
   beforeDestroy() {
    this.stopRecognition();
  },
};
</script>


