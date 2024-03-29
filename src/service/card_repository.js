import { firebaseDatabase } from './firebase';

class CardRepository {
  syncCards(userId, onUpdate, month) {
    const ref = firebaseDatabase.ref(`${userId}/${month}/cards`);
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      value ? onUpdate(value) : onUpdate('');
    });
    return () => ref.off();
  }

  saveCard(userId, card, month) {
    firebaseDatabase.ref(`${userId}/${month}/cards/${card.id}`).set(card);
  }

  removeCard(userId, card, month, update) {
    update
      ? firebaseDatabase
          .ref(`${userId}/${month}/cards/${card.beforeId}`)
          .remove()
      : firebaseDatabase.ref(`${userId}/${month}/cards/${card.id}`).remove();
  }
}

export default CardRepository;
