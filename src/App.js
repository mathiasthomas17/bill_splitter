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

// App Component
export default function App() {
  // hide and Show Add Friend Form State
  const [showFriendForm, setShowFriendForm] = useState(false);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <AddFriendFrom />
        <Button>Add Friends</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

// Friends List Components
function FriendsList() {
  return (
    <ul>
      {initialFriends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

// Friend Component
function Friend({ friend }) {
  return (
    <li>
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
      <Button>Select</Button>
    </li>
  );
}

// Button Component for reuse
function Button({ children }) {
  return <button className="button">{children}</button>;
}
// Add Friend Form

function AddFriendFrom() {
  return (
    <form className="form-add-friend">
      <label>👯‍♂️Friend name</label>
      <input type="text" />
      <label>Image URL</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}

// Form Split Bill
function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2> Split a bill with</h2>
      <label>💶 Bill Value</label>
      <input type="text" />
      <label>🧍‍♂️Your Expenses</label>
      <input type="text" />
      <label>🧍‍♀️ X's Expense</label>
      <input type="text" disabled />
      <label>💶 Who Is Paying The Bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">Friend</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
