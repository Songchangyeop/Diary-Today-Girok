import { firebaseDatabase } from './firebase';

class CardRepository {
  syncCards(userId, onUpdate, month) {
    const ref = firebaseDatabase.ref(`${userId}/${month}/cards`);
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }
  saveCard(userId, card, month) {
    console.log(month);
    firebaseDatabase.ref(`${userId}/${month}/cards/${card.id}`).set(card);
  }

  removeCard(userId, card, month) {
    firebaseDatabase.ref(`${userId}/${month}/cards/${card.id}`).remove();
  }
}

export default CardRepository;
