import client from "./client";

// REGISTER
export async function createUser(userInfo) {
   try {
      const {data} = await client.post("/users/create-user", userInfo);
      return data;
   } catch (error) {
      const {response} = error;
      if (response?.data) return response.data;
      return {error: error.message || error};
   }
}

// VERIFY EMAIL
export async function verifyUserEmail(userInfo) {
   try {
      const {data} = await client.post("/users/verify-email", userInfo);
      return data;
   } catch (error) {
      const {response} = error;
      if (response?.data) return response.data;
      return {error: error.message || error};
   }
}

// RESEND VERIFY EMAIL
export async function resendVerifyEmailOTP(userId) {
   try {
      const {data} = await client.post("/users/resend-email-verification-OTP", {userId});
      return data;
   } catch (error) {
      const {response} = error;
      if (response?.data) return response.data;
      return {error: error.message || error};
   }
}

// SIGN IN
export async function userSignIn(userInfo) {
   try {
      const {data} = await client.post("/users/sign-in", userInfo);
      return data;
   } catch (error) {
      const {response} = error;
      if (response?.data) return response.data;
      return {error: error.message || error};
   }
}

// IS USER AUTHENTICATED
export async function getIsAuth(token) {
   try {
      const {data} = await client.get("/users/is-auth", {
         headers: {Authorization: `Bearer ${token}`, accept: "application/json"},
      });
      return data;
   } catch (error) {
      const {response} = error;``
      if (response?.data) return response.data;
      return {error: error.message || error};
   }
}

//send Forgot Password Link to User Email
export async function sendForgotPasswordLink(email) {
   try {
      const {data} = await client.post("/users/forgot-password", {email});
      return data;
   } catch (error) {
      const {response} = error;
      if (response?.data) return response.data;
      return {error: error.message || error};
   }
}

// verify reset-password token
export async function verifyPassResetToken(userId, token) {
   try {
      const {data} = await client.post("/users/verify-reset-password-token", {userId, token});
      return data;
   } catch (error) {
      const {response} = error;
      if (response?.data) return response.data;
      return {error: error.message || error};
   }
}

// Change Password
export async function changePassword(userInfo) {
   try {
      const {data} = await client.post("/users/reset-password", userInfo);
      return data;
   } catch (error) {
      const {response} = error;
      if (response?.data) return response.data;
      return {error: error.message || error};
   }
}
