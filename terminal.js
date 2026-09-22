// Local portfolio commands; no shell or external requests.
(() => {
  const section = document.getElementById('explore');
  if (!section) return;
  const input = section.querySelector('input');
  const output = section.querySelector('[role="log"]');
  function print(text) {
    const line = document.createElement('p');
    line.textContent = text;
    output.append(line);
  }
  function linkTo(label, href) {
    const line = document.createElement('p');
    const link = document.createElement('a');
    link.textContent = label;
    link.href = href;
    line.append(link);
    output.append(line);
  }
  function run(value) {
    const command = value.trim().toLowerCase();
    if (!command) return;
    print(`> ${command}`);
    switch (command) {
      case 'help':
        print('whoami — About Hamdi\nskills — My toolkit\nprojects — Project list\ncontact — Get in touch\nclear — Clear terminal');
        break;
      case 'whoami':
        print('Hamdi Mohammed\nIT student at JKUAT · Nairobi, Kenya');
        linkTo('More about me →', '#about');
        break;
      case 'skills':
        print(Array.from(document.querySelectorAll('.skill-cell')).map(cell => `${cell.querySelector('h3').textContent}\n${Array.from(cell.querySelectorAll('li')).map(item => item.textContent).join(' / ')}`).join('\n\n'));
        linkTo('Explore skills →', '#skills');
        break;
      case 'projects':
        document.querySelectorAll('.proj-card').forEach(card => {
          print(`${Array.from(card.querySelectorAll('.proj-head span')).map(item => item.textContent).join(' / ')}\n${card.querySelector('h3').textContent}`);
        });
        linkTo('View all projects →', '#projects');
        linkTo('Read the network case study →', 'hamdi-network-lab.html');
        break;
      case 'contact':
        print('Open to opportunities in IT support, networking, and systems administration.');
        linkTo('Go to contact section →', '#contact');
        break;
      case 'clear':
        output.replaceChildren();
        print('Terminal cleared. Type help to start again.');
        break;
      default:
        print(`Unknown command: ${command}. Type help for the command list.`);
    }
    while (output.children.length > 60) output.firstElementChild.remove();
    output.scrollTop = output.scrollHeight;
    input.value = '';
  }
  section.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    run(input.value);
  });
  section.querySelectorAll('[data-command]').forEach(button => {
    button.addEventListener('click', () => run(button.dataset.command));
  });
  section.hidden = false;
})();
