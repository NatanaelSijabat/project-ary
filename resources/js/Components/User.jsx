import React from "react";

export default function User(props) {
    return (
        <>
            <td>{props.user.name}</td>
            <td>{props.user.role}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </>
    );
}
