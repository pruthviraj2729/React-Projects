import conf from "../conf/conf.js";
import { Client,Account,ID } from "appwrite";


// Cache the current user to prevent redundant API calls
let currentUser = null;
let lastAuthCheck = 0;
const AUTH_CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export class AuthService {
    client = new Client;
    account;

    constructor() {
        this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name})  {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                // call another method
                return this.login(email, password);
            } else {
                return userAccount;
            }   
        } catch (error) {
            throw error;
        }
    } 

    async login(email, password) {
        try {
            // Clear all local state first
            currentUser = null;
            lastAuthCheck = 0;
            
            // Clear all local storage and cookies
            localStorage.removeItem('cookieFallback');
            document.cookie.split(";").forEach(function(c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            
            // Try to delete any existing sessions (but don't fail if it doesn't work)
            try {
                await this.account.deleteSessions();
            } catch (deleteError) {
                if (deleteError.code !== 401) {
                    console.error("Error deleting sessions:", deleteError);
                }
            }
            
            // Add a small delay to ensure cleanup is complete
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Create new session
            const session = await this.account.createEmailPasswordSession(email, password);
            
            // Force a fresh user fetch on next check
            currentUser = null;
            lastAuthCheck = 0;
            return session;
        } catch (error) {
            console.error("Login failed:", error);
            // Clear any partial session data
            currentUser = null;
            lastAuthCheck = 0;
            localStorage.removeItem('cookieFallback');
            throw error;
        }
    }

    async getCurrentUser(forceCheck = false) {
        const now = Date.now();
        
        // Return cached user if still valid
        if (!forceCheck && currentUser && (now - lastAuthCheck) < AUTH_CACHE_DURATION) {
            return currentUser;
        }
        
        try {
            // First, try to get the current session
            try {
                await this.account.getSession('current');
                // If we get here, session is valid, get user data
                const user = await this.account.get();
                // Update cache
                currentUser = user;
                lastAuthCheck = now;
                return user;
            } catch (sessionError) {
                // If no valid session, clear everything
                if (sessionError.code === 401) {
                    await this.logout();
                } else {
                    console.error("Session check failed in getCurrentUser:", sessionError);
                }
                throw sessionError;
            }
        } catch (error) {
            // Clear cache on any error
            currentUser = null;
            lastAuthCheck = now;
            
            // Only log unexpected errors, not 401s which are normal
            if (error.code !== 401) {
                console.error("Appwrite service :: getCurrentUser :: error", error);
            }
            return null;
        }
    }

    async logout() {
        try {
            // Clear all local state first
            currentUser = null;
            lastAuthCheck = 0;
            
            // Try to delete all sessions
            try {
                await this.account.deleteSessions();
            } catch (deleteError) {
                // Ignore if there are no sessions to delete
                if (deleteError.code !== 401) {
                    console.error("Error deleting sessions during logout:", deleteError);
                }
            }
            
            // Clear all cookies and local storage
            localStorage.removeItem('cookieFallback');
            document.cookie.split(";").forEach(function(c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            
            // Add a small delay to ensure cleanup is complete
            await new Promise(resolve => setTimeout(resolve, 300));
            
            return true;
        } catch (error) {
            console.error("Logout failed:", error);
            // Still clear everything even if logout fails
            currentUser = null;
            lastAuthCheck = 0;
            localStorage.removeItem('cookieFallback');
            document.cookie.split(";").forEach(function(c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            return true; // Still return true to allow UI to update
        }
    }

}

const authService = new AuthService()

export default authService;
