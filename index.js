
    let favCount = 0;
    let copyCount = 0;
    let coins = 100;
    const favEl = document.getElementById('fav-count');
    const copyEl = document.getElementById('copy-count');
    const coinEl = document.getElementById('coin-count');
    const historyEl = document.getElementById('call-history');

    function renderCounts() {
      favEl.textContent = favCount;
      copyEl.textContent = copyCount + ' Copy';
      coinEl.textContent = coins;
    }

    function addHistoryEntry(name, number) {
      if (historyEl.children.length === 1 && historyEl.children[0].textContent.includes('No call history')) {
        historyEl.innerHTML = '';
      }
      const li = document.createElement('li');
      li.className = 'p-3 bg-gray-50 rounded shadow-sm flex justify-between items-start';
      const left = document.createElement('div');
      left.innerHTML = '<div class="font-semibold">' + name + '</div><div class="text-xs text-pink-500">' + number + '</div>';
      const right = document.createElement('div');
      const time = new Date().toLocaleTimeString();
      right.innerHTML = '<div class="text-xs text-blue-400 ">' + time + '</div>';
      li.appendChild(left);
      li.appendChild(right);
      historyEl.prepend(li);
    }
    document.querySelectorAll('.card-heart').forEach(el => {
      el.addEventListener('click', function() {
        const svc = this.dataset.service;
        favCount++;
        renderCounts();
   
        this.classList.add('scale-110');
        setTimeout(() => this.classList.remove('scale-110'), 150);
      });
    });

    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', async function() {
        const number = this.dataset.number;
        try {
          await navigator.clipboard.writeText(number);
          copyCount++;
          renderCounts();
          alert('Copied: ' + number);
        } catch (err) {
          const textarea = document.createElement('textarea');
          textarea.value = number;
          document.body.appendChild(textarea);
          textarea.select();
          try { document.execCommand('copy'); copyCount++; renderCounts(); alert('Copied: ' + number); } catch(e) { alert('Copy failed'); }
          textarea.remove();
        }
      });
    });


    document.querySelectorAll('.call-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const name = this.dataset.name;
        const number = this.dataset.number;


        if (coins < 20) {
          alert('Not enough coins to make this call. Each call costs 20 coins.');
          return;
        }
        alert('Calling ' + name + ' (' + number + ')');
        coins -= 20;
        renderCounts();
        addHistoryEntry(name, number);
      });
    });
    document.getElementById('clear-history').addEventListener('click', function() {
      historyEl.innerHTML = '<li class="text-pink-500">No call history yet.</li>';
    });
    renderCounts();