(() => {
  const queryUser = (question) => {
    const app = document.getElementById("app");
    if (question.type === "result") {
      const connector = document.createElement("div");
      connector.className = "connector";
      app.appendChild(connector);
      const result = document.createElement("div");
      result.className = "result";
      result.innerHTML = `<div style='text-align: center; margin-bottom: 1em;'><strong>Guidance</strong></div>${question.text}`;
      app.appendChild(result);
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      return;
    }

    const questionElement = document.createElement("div");
    questionElement.className = "question";
    if (question.text) {
      questionElement.innerHTML = question.text;
    }

    const options = Object.keys(question).filter(
      (option) =>
        option !== "text" &&
        option !== "type" &&
        option !== "buttonText" &&
        option !== "isRoot"
    );
    for (const option of options) {
      const button = document.createElement("button");
      button.innerHTML = question[option].buttonText;
      button.onclick = () => {
        const buttons = document
          .getElementById("app")
          .getElementsByTagName("button");
        button.disabled = true;
        for (const btn of buttons) {
          if (btn.disabled === false) {
            btn.classList.add("remove");
          }
        }

        queryUser(question[option]);
      };
      questionElement.appendChild(button);
    }

    if (!question.isRoot) {
      const connector = document.createElement("div");
      connector.className = "connector";
      app.appendChild(connector);
    }

    app.appendChild(questionElement);


      questionElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

  };

  const tree = {
    text: "Does the image contain text?",
    isRoot: true,
    yes: {
      buttonText: "Yes",
      text: "Choose option that best describes the text in the image.",
      realTextNearby: {
        buttonText: "The text is also present as real text nearby.",
        text: "Use an empty <code>alt</code> attribute. See <a href='https://www.w3.org/WAI/tutorials/images/decorative/' target='_blank'>Decorative Images</a>",
        type: "result",
      },
      visualEffect: {
        buttonText: "The text is only shown for visual effects.",
        type: "result",
        text: "Use an empty <code>alt</code> attribute. See <a href='https://www.w3.org/WAI/tutorials/images/decorative/' target='_blank'>Decorative Images</a>",
      },
      specificFunction: {
        buttonText:
          "The text is used for a specific function, for example, an icon.",
        type: "result",
        text: "Use the <code>alt</code> attribute to communicate the function of the image. See <a href='https://www.w3.org/WAI/tutorials/images/functional/' target='_blank'>Functional Images</a>.",
      },
      onlyInImage: {
        buttonText: "The text is not present otherwise.",
        type: "result",
        text: "Use the <code>alt</code> attribute to include the text of the image. See <a href='https://www.w3.org/WAI/tutorials/images/textual/#styled-text-decorative-effect' target='_blank'>Images of Text</a>.",
      },
    },
    no: {
      buttonText: "No",
      text: "Is the image used in a link or a button, and would it be hard or impossible to understand what the link or the button does, if the image wasn’t there?",
      yes: {
        buttonText: "Yes",
        type: "result",
        text: "Use the <code>alt</code> attribute to communicate the destination of the link or action taken.  See <a href='https://www.w3.org/WAI/tutorials/images/functional/' target='_blank'>Functional Images</a>.",
      },
      no: {
        buttonText: "No",
        text: "Does the image contribute meaning to the current page or context?",
        yes: {
          buttonText: "Yes",
          text: "Choose the option that best describes the image.",
          simpleGraphic: {
            buttonText: "The image is a simple graphic",
            text: "Use a brief description of the image in a way that conveys that meaning in the <code>alt</code> attribute. See <a href='https://www.w3.org/WAI/tutorials/images/informative/' target='_blank'>Informative Images</a>.",
            type: "result",
          },
          complexGraphic: {
            buttonText:
              "The image is a graph or a complex piece of information",
            text: "Include the information contained in the image elsewhere on the page. See <a href='https://www.w3.org/WAI/tutorials/images/complex/' target='_blank'>Complex Images</a>.",
            type: "result",
          },
          redundant: {
            buttonText:
              "The image shows content that is redundant to real text nearby",
            text: "Use an empty <code>alt</code> attribute. See (redundant) <a href='https://www.w3.org/WAI/tutorials/images/functional/' target='_blank'>Functional Images</a>",
            type: "result",
          },
        },
        no: {
          buttonText: "No",
          text: "Is the image purely decorative or not intended for users?",
          yes: {
            buttonText: "Yes",
            type: "result",
            text: "Use an empty <code>alt</code> attribute. See <a href='https://www.w3.org/WAI/tutorials/images/decorative/' target='_blank'>Decorative Images</a>.",
          },
          no: {
            buttonText: "No",
            type: "result",
            text: "This decision tree does not cover all cases. For detailed information on the provision of text alternatives refer to the <a href='https://www.w3.org/WAI/tutorials/images/' target='_blank'>WCAG Images Tutorial</a>.",
          },
        },
      },
    },
  };

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("embed")) {
    const app = document.getElementById("app");
    app.style.overflowY = "auto";
  }
  queryUser(tree);
})();
