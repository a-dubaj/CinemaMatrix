BEGIN;


CREATE TABLE IF NOT EXISTS public."Admins"
(
    id integer NOT NULL DEFAULT nextval('"Admins_id_seq"'::regclass),
    fullname character varying(255) COLLATE pg_catalog."default",
    phone character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    avatar character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
                              CONSTRAINT "Admins_pkey" PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS public."Bookings"
(
    id uuid NOT NULL,
    user_id integer,
    showtime_id integer,
    total integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Bookings_pkey" PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS public."CinemaTypes"
(
    id integer NOT NULL DEFAULT nextval('"CinemaTypes_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT "CinemaTypes_pkey" PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS public."Cinemaplexes"
(
    id integer NOT NULL DEFAULT nextval('"Cinemaplexes_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    image character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT "Cinemaplexes_pkey" PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS public."Cinemas"
(
    id integer NOT NULL DEFAULT nextval('"Cinemas_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    cinemaplex_id integer,
    "cinemaType_id" integer,
    vertical_size integer,
    horizontal_size integer,
    CONSTRAINT "Cinemas_pkey" PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS public."Movies"
(
    id uuid NOT NULL,
    slug character varying(255) COLLATE pg_catalog."default",
    title character varying(255) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    director character varying(255) COLLATE pg_catalog."default",
    actor character varying(255) COLLATE pg_catalog."default",
    genre character varying(255) COLLATE pg_catalog."default",
    poster character varying(255) COLLATE pg_catalog."default",
    running_time integer,
    release_date date,
    trailer character varying(255) COLLATE pg_catalog."default",
    state character varying(255) COLLATE pg_catalog."default",
    active boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
                              CONSTRAINT "Movies_pkey" PRIMARY KEY (id),
    CONSTRAINT "Movies_slug_key" UNIQUE (slug)
    );

CREATE TABLE IF NOT EXISTS public."Showtimes"
(
    id integer NOT NULL DEFAULT nextval('"Showtimes_id_seq"'::regclass),
    movie_id uuid,
    cinema_id integer,
    start_time timestamp with time zone,
    end_time timestamp with time zone,
                           price integer,
                           CONSTRAINT "Showtimes_pkey" PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS public."Tickets"
(
    id uuid NOT NULL,
    booking_id uuid,
    seat_code character varying(255) COLLATE pg_catalog."default",
    price integer,
    CONSTRAINT "Tickets_pkey" PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS public."Users"
(
    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    fullname character varying(255) COLLATE pg_catalog."default",
    birthday date,
    phone character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    avatar character varying(255) COLLATE pg_catalog."default",
    status character varying(255) COLLATE pg_catalog."default",
    "resetPasswordToken" character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
                              CONSTRAINT "Users_pkey" PRIMARY KEY (id)
    );
END;