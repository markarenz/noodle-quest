const dialogueData = {
    balloony1: {
        name: "Red Balloony",
        paths: {
            intro: {
                label: "Hello, young junebug. Are you lost?",
                options: [
                    {
                        label: "I'm looking for noodles. Have you seen any?",
                        slug: "noodles"
                    },
                    {
                        label: "How do I get the bunny to move out of the way?",
                        slug: "bunny"
                    },
                    {
                        label: "Nah. I'm good.",
                        slug: "exit"
                    },
                ]
            },
            noodles: {
                label: "Oh, yes. I saw one just to the north of here. You'll find at least one noodle for every big section of land.",
                options: [
                    {
                        label: "OK. I have a big animal blocking my path. Any advice?",
                        slug: "bunny"
                    },
                    {
                        label: "Thanks. I'll keep looking.",
                        slug: "exit"
                    },
                ]
            },
            bunny: {
                label: "If you see an animal in your way, think of what it likes to eat then try to find it. Then you can stand next to them and tap that item in your inventory to feed the animal.",
                options: [
                    {
                        label: "OK. Have you seen any noodles?",
                        slug: "noodles"
                    },
                    {
                        label: "Thanks. I'll think about what rabbits and bears like to eat.",
                        slug: "exit"
                    },
                ]
            },
        }
    },
    balloony2: {
        name: "Purple Balloony",
        paths: {
            intro: {
                label: "Greetings. I hear you are looking for noodles for your lunch. Can I help?",
                options: [
                    {
                        label: "Where can I find more keys to open doors?",
                        slug: "keys"
                    },
                    {
                        label: "What are those flags I keep seeing?",
                        slug: "flags"
                    },
                    {
                        label: "OK. I'll keep moving on.",
                        slug: "exit"
                    },
                ]
            },
            keys: {
                label: "There are two just north and south of the path that lead you to this section of the map.",
                options: [
                    {
                        label: "OK. What are those flags for?",
                        slug: "flags"
                    },
                    {
                        label: "Thanks. I'll keep looking.",
                        slug: "exit"
                    },
                ]
            },
            flags: {
                label: "Those are place markers. Walk through to activate them. Once you find the teleporter you can zap right to those spots. ",
                options: [
                    {
                        label: "OK. Have you seen any keys?",
                        slug: "keys"
                    },
                    {
                        label: "Thanks. I'll keep an eye out for those flags.",
                        slug: "exit"
                    },
                ]
            },
        }
    },
    balloony3: {
        name: "Blue Balloony",
        paths: {
            intro: {
                label: "You are well on your way, junebug. Be safe! Can I help you?",
                options: [
                    {
                        label: "There's a big duck in my way. How do I get her to move?",
                        slug: "duck"
                    },
                    {
                        label: "How can I get the fish?",
                        slug: "salmon"
                    },
                    {
                        label: "OK. I'll keep moving on.",
                        slug: "exit"
                    },
                ]
            },
            duck: {
                label: "Ducks love bread. Have you seen any bread you could feed the duck?",
                options: [
                    {
                        label: "OK. How can I catch the fish?",
                        slug: "salmon"
                    },
                    {
                        label: "Thanks. I'll keep looking.",
                        slug: "exit"
                    },
                ]
            },
            salmon: {
                label: "That fish is a salmon, a bear's favorite food. To catch it, find the fishing rod and tap it in the inventory when standing near the fish. ",
                options: [
                    {
                        label: "OK. Any advice for how to handle the duck?",
                        slug: "duck"
                    },
                    {
                        label: "Thanks. I'll keep an eye out for those flags.",
                        slug: "exit"
                    },
                ]
            },
        }
    },
    balloony4: {
        name: "Yellow Balloony",
        paths: {
            intro: {
                label: "You've ventured far, little junebug. Can I help you find your way?",
                options: [
                    {
                        label: "What do squirrels like to eat?",
                        slug: "squirrel"
                    },
                    {
                        label: "What do I do with the noodles once I've collected them all?",
                        slug: "bowl"
                    },
                    {
                        label: "OK. I'll keep moving on.",
                        slug: "exit"
                    },
                ]
            },
            squirrel: {
                label: "As anyone with a birdfeeder will tell you, squirrels eat lots of things. If you find an acorn, I'm sure that will work.",
                options: [
                    {
                        label: "Thanks. Any advice on what to do with these noodles?",
                        slug: "bowl"
                    },
                    {
                        label: "Thanks. I'll keep that in mind.",
                        slug: "exit"
                    },
                ]
            },
            bowl: {
                label: "Near where you started, you'll see a big bowl. Stand next to it and tap the noodles in your inventory.",
                options: [
                    {
                        label: "OK. Any idea what I can do for the squirrel?",
                        slug: "squirrel"
                    },
                    {
                        label: "Thanks. Now I know what to do.",
                        slug: "exit"
                    },
                ]
            },
        }
    },
};

export default dialogueData;
