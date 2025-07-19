const billInput = document.querySelector('input[placeholder="0"]');
const peopleInput = document.querySelectorAll('input[placeholder="0"]')[1];
const tipButtons = document.querySelectorAll('button:not(#resetBtn):not(.custom-tip)');
const customTipInput = document.querySelector('.custom-tip');
const tipAmountEl = document.querySelectorAll('.text-3xl')[0];
const totalEl = document.querySelectorAll('.text-3xl')[1];
const resetBtn = document.getElementById('resetBtn');

let bill = 0;
let tipPercent = 0;
let people = 0;

// Handle tip button click
tipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
   const isActive = btn.classList.contains('active-tip');

    removeActiveStates();

    if (!isActive) {
      // Make this button active
       btn.classList.add('active-tip');
      tipPercent = parseInt(btn.textContent);
      customTipInput.value = '';
      customTipInput.classList.remove('active-tip');
    } else {
      // Deselect if already active
      tipPercent = 0;
    }
    calculate();
  });
});


// Custom tip
customTipInput.addEventListener('input', () => {
  const custom = parseFloat(customTipInput.value);
  
  removeActiveStates();
  
  if (!isNaN(custom) && custom > 0) {
    tipPercent = custom;
   customTipInput.classList.add('active-tip');
  } else {
    tipPercent = 0;
    customTipInput.classList.remove('active-tip');
  }
  
  calculate();
});

billInput.addEventListener('input', e => {
  bill = parseFloat(e.target.value) || 0;
  calculate();
});

peopleInput.addEventListener('input', e => {
  people = parseInt(e.target.value) || 0;
  validatePeople();
  calculate();
});

resetBtn.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = ''; 

  removeActiveStates();
  tipAmountEl.textContent = '$0.00';
  totalEl.textContent = '$0.00';
  bill = 0;
  tipPercent = 0;
  people = 0;
    validatePeople();
      toggleReset();
});

// Helper functions
function removeActiveStates() {
  tipButtons.forEach(b => b.classList.remove('active-tip'));
  customTipInput.classList.remove('active-tip');
}

function validatePeople() {
  const errorEl = document.getElementById('peopleError');
  if (people <= 0) {
    peopleInput.classList.add('border-2', 'border-red-500');
    errorEl.classList.remove('hidden');
  } else {
    peopleInput.classList.remove('border-2', 'border-red-500');
    errorEl.classList.add('hidden');
  }
}
function validateTip() {
  if (tipPercent <= 0) {
    alert('Tip percentage must be greater than 0.');
    tipPercent = 0;
  }
}

function calculate() {
  if (people >= 1 && bill > 0 && tipPercent > 0) {
    const tipAmount = (bill * (tipPercent / 100)) / people;
    const total = (bill / people) + tipAmount;
    tipAmountEl.textContent = `$${tipAmount.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  } else {
    tipAmountEl.textContent = '$0.00';
    totalEl.textContent = '$0.00';
  }
}
