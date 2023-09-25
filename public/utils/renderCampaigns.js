const selectAccount = document.getElementById('account');
const campDiv = document.getElementById('campaigns');

selectAccount.addEventListener('change', async () => {
    const accountID = selectAccount.value;

    try {
        const response = await fetch(`/campanhas/${accountID}`);
        const camps = await response.json();
        
    } catch (error) {
        console.error(error);
    }
});