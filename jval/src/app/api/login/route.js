export async function POST(request) {
  const body = await request.json();
  const { username, password } = body;

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  // Debug log
  console.log("ENV USERNAME:", ADMIN_USERNAME);
  console.log("ENV PASSWORD:", ADMIN_PASSWORD);
  console.log("BODY USERNAME:", username);
  console.log("BODY PASSWORD:", password);

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return new Response(
      JSON.stringify({ success: true, token: "admin-token" }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid credentials" }),
      { status: 401 }
    );
  }
}