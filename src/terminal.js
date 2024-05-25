function init() {
    const term = initAndGetTerm();

    renderTerminal(term);
}

function renderTerminal(term) {
    const font = 'Standard';
    figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
    figlet.loadFont([font], ready);

    function ready() {
        term.echo(() => {
            const ascii = render('RikkTerm');
            return `<darkolivegreen><glow>${ascii}</glow></darkolivegreen><div>\nWelcome to my Terminal Portfolio\n</div>`;
        });
    }

    function render(text) {
        const cols = term.cols();
        return figlet.textSync(text, {
            font: font,
            width: cols,
            whitespaceBreak: true
        });
    }
}

function initAndGetTerm(){
    const commands = {};

    return $('#terminal').terminal(commands, {
        greetings: false
    });
}



export { init }
