function deleteMedicine(id) {
    if (confirm('Вы уверены, что хотите удалить этот препарат?')) {
        fetch('/medicines/' + id, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    window.location.reload();
                } else {
                    alert('Ошибка при удалении');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Произошла ошибка');
            });
    }
}