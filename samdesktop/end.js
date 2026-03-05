(function(){
  const params = new URLSearchParams(window.location.search);
  const choice = params.get('choice') || 'yes';
  const storedName = PlayerStorage.get();

  if(choice === 'no') {
    document.getElementById('end-no').style.display = 'block';
  } else {
    document.getElementById('end-yes').style.display = 'block';
    document.getElementById('player-name').textContent = storedName; // ✅
    document.getElementById('ref-name').textContent    = storedName; // ✅
  }
})();