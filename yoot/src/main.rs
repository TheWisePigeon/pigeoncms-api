#[macro_use] extern  crate rocket;

#[get("/login")]
fn login() -> &'static str {
    "Hello, world! Login route"
}

#[get("/register")]
fn register() -> &'static str {
    "Breh"
}

#[launch]
fn rocket()-> _{
    rocket::build()
        .mount("/auth", routes![login, register])
}