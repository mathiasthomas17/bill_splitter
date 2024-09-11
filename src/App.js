import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// Button Component for reuse
<Button onClick="">Add Friends</Button>;
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

// App Component
export default function App() {
  const [friends, setFriends] = useState(initialFriends);

  // hide and Show Add Friend Form State
  const [showFriendForm, setShowFriendForm] = useState(false);
  // hide and Show Split  Bill Form State
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Handle Add Friends
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    // hide form after submitting
    setShowFriendForm(false);
  }

  function handleShowAddFriendForm() {
    setShowFriendForm((show) => !show);
  }

  function handleSelectedFriend(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowFriendForm(false);
  }

  function handleSplitBill(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />

        {showFriendForm && <AddFriendFrom onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriendForm}>
          {showFriendForm ? "Close" : "Add Friends"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

// Friends List Components
function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend} //prop drilling
        />
      ))}
    </ul>
  );
}

// Friend Component
function Friend({ friend, onSelection, selectedFriend }) {
  const is_selected = selectedFriend?.id === friend.id;
  return (
    <li className={is_selected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You Owe {friend.name} $ {friend.balance}{" "}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} Owes You $ {friend.balance}{" "}
        </p>
      )}
      {friend.balance === 0 && (
        <p className="">You and {friend.name} are even</p>
      )}
      {/* <button className="button">Select</button> */}
      <Button onClick={() => onSelection(friend)}>
        {is_selected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

// Add Friend Form

function AddFriendFrom({ onAddFriend }) {
  // Controlled elements/State
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID();
  function handleAddUserSubmit(e) {
    e.preventDefault();
    // Guard Clause
    if (!name || !image) return;
    const newFriend = {
      name,
      image: `${image}?u=${id}`,
      balance: 0,
      id,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleAddUserSubmit}>
      <label>👯‍♂️Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

// Form Split Bill
function FormSplitBill({ selectedFriend, onSplitBill }) {
  // Split Bill Controlled Elelments
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("You");

  // Handle Submit
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
    // setSelectedFriend(null);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2> Split a bill with {selectedFriend.name}</h2>
      <label>💶 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🧍‍♂️Your Expenses</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill
              ? paidByFriend
              : Number(e.target.value)
          )
        }
      />
      <label>🧍‍♀️ {selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>💶 Who Is Paying The Bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
