import React from 'react';

export const Home = () => <div className="flex flex-col items-center justify-center min-h-screen"><h1 className="text-3xl font-bold">Quiz App Home</h1></div>;
export { default as Login } from './Login';
export { default as Signup } from './Signup';
export { default as Quiz } from './Quiz';
export { default as Result } from './Result';
export { default as Leaderboard } from './Leaderboard';
export const NotFound = () => <div className="flex flex-col items-center justify-center min-h-screen"><h1 className="text-2xl font-bold">404 - Not Found</h1></div>;
