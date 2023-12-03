console.log('this works');

const promptInput = document.querySelector(".prompt-input");
const resultText = document.querySelector(".result-container");
const generateBtn = document.getElementById("generateBtn");

const sendPromptToServer = async (e) => {
    e.preventDefault()
    // console.log(prompt)
    let prompt = promptInput.value
    try {
        const response = await fetch('http://localhost:3000/ask', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({ prompt })
        })
        // console.log(response.body)
        const data = await response.json()
        // console.log(data)
        renderToPage(data)
    } catch (error) {
        console.error("Error:", error);
    }
}

const renderToPage = (text) => {
    console.log(text)
    let paragraph = document.createElement("p");
    paragraph.classList.add("card")
    paragraph.innerHTML = text.data
    resultText.appendChild(paragraph)
}

// button click
generateBtn.addEventListener("click", sendPromptToServer);