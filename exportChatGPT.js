javascript:(function() {
    function generateHTML(chatElements) {
        let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatGPT Export</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .user, .assistant {
            display: flex;
            flex-direction: column;
        }
        .message {
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
        }
        .user .message {
            background-color: #f0f8ff;
        }
        .assistant .message {
            background-color: #fff;
        }
    </style>
</head>
<body>
    <div class="chat-container">
`;

        chatElements.forEach(({sender, content}) => {
            html += `
        <div class="${sender}">
            <div class="message">
                <strong>${sender.charAt(0).toUpperCase() + sender.slice(1)}:</strong> ${content}
            </div>
        </div>
`;
        });

        html += `
    </div>
</body>
</html>
`;

        return html;
    }

    function saveToFile(filename, content) {
        const blob = new Blob([content], {type: 'text/html;charset=utf-8'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }

    function extractChat() {
        const chatElements = Array.from(document.querySelectorAll('.chat-message-selector')); // Replace '.chat-message-selector' with the appropriate selector for the chat messages in your web app.
        const chatData = chatElements.map(element => {
            const sender = element.querySelector('.sender-selector').textContent; // Replace '.sender-selector' with the appropriate selector for the sender's name in your web app.
            const content = element.querySelector('.content-selector').textContent; // Replace '.content-selector' with the appropriate selector for the chat message content in your web app.
            return {sender, content};
        });

        const html = generateHTML(chatData);
        saveToFile('chatgpt_export.html', html);
    }

    extractChat();
})();

    function shareFile(html) {
        const blob = new Blob([html], {type: 'text/html;charset=utf-8'});
        const file = new File([blob], 'chatgpt_export.html', {type: 'text/html;charset=utf-8'});
        const title = 'ChatGPT Export';

        if (navigator.share && navigator.canShare({files: [file]})) {
            navigator.share({
                title: title,
                text: 'Here is the ChatGPT export file you requested.',
                files: [file]
            }).then(() => {
                console.log('File shared successfully');
            }).catch((error) => {
                console.error('Error sharing file:', error);
            });
        } else {
            alert('File sharing is not supported in this browser. The file has been downloaded, and you can share it manually.');
        }
    }

    const chatData = extractChat();
    const html = generateHTML(chatData);
    saveToFile('chatgpt_export.html', html);
    shareFile(html);
})();
