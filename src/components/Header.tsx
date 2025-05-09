import React from 'react';

const Header: React.FC<{ xIsNext: boolean }> = ({ xIsNext }) => {
    return (
        <header className="text-center p-4">
            <h1 className="text-2xl font-bold">Tic Tac Toe</h1>
            <p className="mt-2 text-lg">Current Player: {xIsNext ? 'X' : 'O'}</p>
        </header>
    );
};

export default Header;