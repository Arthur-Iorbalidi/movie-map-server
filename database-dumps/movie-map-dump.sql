--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: actor_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.actor_users (
    id integer NOT NULL,
    "actorId" integer,
    "userId" integer
);


ALTER TABLE public.actor_users OWNER TO postgres;

--
-- Name: actor_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.actor_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.actor_users_id_seq OWNER TO postgres;

--
-- Name: actor_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.actor_users_id_seq OWNED BY public.actor_users.id;


--
-- Name: actors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.actors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    description text,
    height numeric,
    birthday date NOT NULL,
    "dateOfDeath" date,
    image character varying(255),
    "placeOfBirth" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.actors OWNER TO postgres;

--
-- Name: actors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.actors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.actors_id_seq OWNER TO postgres;

--
-- Name: actors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.actors_id_seq OWNED BY public.actors.id;


--
-- Name: director_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.director_users (
    id integer NOT NULL,
    "directorId" integer,
    "userId" integer
);


ALTER TABLE public.director_users OWNER TO postgres;

--
-- Name: director_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.director_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.director_users_id_seq OWNER TO postgres;

--
-- Name: director_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.director_users_id_seq OWNED BY public.director_users.id;


--
-- Name: directors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    description text,
    birthday date NOT NULL,
    "dateOfDeath" date,
    image character varying(255),
    "placeOfBirth" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.directors OWNER TO postgres;

--
-- Name: directors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.directors_id_seq OWNER TO postgres;

--
-- Name: directors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directors_id_seq OWNED BY public.directors.id;


--
-- Name: movie_actors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_actors (
    id integer NOT NULL,
    "movieId" integer,
    "actorId" integer
);


ALTER TABLE public.movie_actors OWNER TO postgres;

--
-- Name: movie_actors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_actors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movie_actors_id_seq OWNER TO postgres;

--
-- Name: movie_actors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movie_actors_id_seq OWNED BY public.movie_actors.id;


--
-- Name: movie_directors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_directors (
    id integer NOT NULL,
    "movieId" integer,
    "directorId" integer
);


ALTER TABLE public.movie_directors OWNER TO postgres;

--
-- Name: movie_directors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_directors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movie_directors_id_seq OWNER TO postgres;

--
-- Name: movie_directors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movie_directors_id_seq OWNED BY public.movie_directors.id;


--
-- Name: movie_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_users (
    id integer NOT NULL,
    "movieId" integer,
    "userId" integer
);


ALTER TABLE public.movie_users OWNER TO postgres;

--
-- Name: movie_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movie_users_id_seq OWNER TO postgres;

--
-- Name: movie_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movie_users_id_seq OWNED BY public.movie_users.id;


--
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    "creationDate" date NOT NULL,
    genre character varying(255) NOT NULL,
    image character varying(255),
    budget integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movies_id_seq OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: actor_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actor_users ALTER COLUMN id SET DEFAULT nextval('public.actor_users_id_seq'::regclass);


--
-- Name: actors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actors ALTER COLUMN id SET DEFAULT nextval('public.actors_id_seq'::regclass);


--
-- Name: director_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.director_users ALTER COLUMN id SET DEFAULT nextval('public.director_users_id_seq'::regclass);


--
-- Name: directors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directors ALTER COLUMN id SET DEFAULT nextval('public.directors_id_seq'::regclass);


--
-- Name: movie_actors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_actors ALTER COLUMN id SET DEFAULT nextval('public.movie_actors_id_seq'::regclass);


--
-- Name: movie_directors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_directors ALTER COLUMN id SET DEFAULT nextval('public.movie_directors_id_seq'::regclass);


--
-- Name: movie_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_users ALTER COLUMN id SET DEFAULT nextval('public.movie_users_id_seq'::regclass);


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: actor_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.actor_users (id, "actorId", "userId") FROM stdin;
\.


--
-- Data for Name: actors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.actors (id, name, surname, description, height, birthday, "dateOfDeath", image, "placeOfBirth", "createdAt", "updatedAt") FROM stdin;
12	Harrison	Ford	Harrison Ford was born on July 13, 1942, in Chicago, Illinois, the son of radio actress Dorothy (Nidelman) and actor-turned-advertising executive Christopher Ford (born John William Ford). His father was of Irish and German descent, and his maternal grandparents were Jewish immigrants from Minsk, Belarus. Harrison was a mediocre student at Maine Township High School East in Park Ridge, Illinois (he was not a sports star, and never earned higher than a C). After dropping out of Ripon College in Wisconsin, where he had acted briefly and later done summer work, he signed a Hollywood contract with Columbia and then Universal. His film and television roles (The Iron Side (1967), The Virginian (1962)) remained minor, and, disillusioned, he turned to a career as a professional carpenter. However, four years later he returned in a big role as Bob Falfa in American Graffiti (1973). Four years later he had a huge success playing Han Solo in Star Wars (1977). Four years later Ford became Indiana Jones in Raiders of the Lost Ark (1981). Four years later he received Academy Award and Golden Globe nominations for his role as John Book in Witness (1985). All he managed to do four years later was his third starring success as Indiana Jones; in fact, many of his previous successful roles led to sequels, like his recent portrayal of Jack Ryan in Patriot Games (1992). He received another Golden Globe nomination for his role as Dr. Richard Kimble in The Fugitive (1993). He is undoubtedly a full-fledged Hollywood superstar. He also owns an 800-acre ranch in Jackson Hole, Wyoming.\n\nFord is a private jet and helicopter pilot and the owner of an 800-acre (3.2 km2) ranch in Jackson, Wyoming, about half of which he has donated as a nature preserve. On several occasions, Ford has personally provided helicopter emergency services at the request of local authorities, in one case rescuing a tourist suffering from dehydration. Ford began flight training in the 1960s at Wild Rose Idlewild Airport in Wild Rose, Wisconsin, flying a Piper PA-22 Tri-Pacer, but at $15 an hour, he could not afford to continue training. In the mid-1990s, he bought a used Gulfstream II and asked one of his pilots, Terry Bender, to give him flying lessons. They began flying a Cessna 182 out of Jackson, Wyoming, and later moved to Teterboro, New Jersey, where they flew a Cessna 206, an aircraft he flew solo. Ford is an honorary board member of the humanitarian aviation organization Wings of Hope.\n\nOn March 5, 2015, Ford's plane, believed to be a Ryan PT-22 Recruit, made an emergency landing at Penmar Golf Course in Venice, California. Ford radioed that the plane had suffered engine failure. He was taken to Ronald Reagan UCLA Medical Center, where he was reported to be in fair to fair condition. Ford suffered a broken pelvis and ankle, among other injuries, in the crash.	1.85	1942-07-13	\N	42.jpg	Chicago, Illinois, USA	2024-10-23 19:29:08.47+03	2024-10-23 19:29:08.47+03
1	Keanu	Reeves	Keanu Charles Reeves was born on September 2, 1964, in Beirut, Lebanon. His mother, Patricia Taylor, was a showgirl, and his father, Samuel Nowlin Reeves Jr., was a geologist. He grew up in Toronto, Canada, and developed an interest in acting from a young age. Reeves' first major role was in the 1986 film 'River's Edge', but he gained worldwide fame for his performance as Neo in 'The Matrix' franchise. He is known for his roles in action films, most notably the 'John Wick' series, and has established himself as one of Hollywood's most beloved stars. Aside from acting, Reeves is also a musician and avid motorcyclist.	1.86	1964-09-02	\N	31.jpg	Beirut, Lebanon	2024-10-23 19:22:47.341+03	2024-10-23 19:22:47.341+03
6	François	Cluzet	François Cluzet was born on September 21, 1955, in Paris, France. He is an acclaimed French actor known for his work in both French and international films. Cluzet gained international recognition for his portrayal of Philippe, a wealthy quadriplegic man, in the hit film 'The Intouchables' (2011). His nuanced performance in the film brought him multiple awards and solidified his status as one of the most respected actors in French cinema.	1.74	1955-09-21	\N	36.jpg	Paris, France	2024-10-23 19:23:13.594+03	2024-10-23 19:23:13.594+03
7	Leonardo	DiCaprio	Leonardo Wilhelm DiCaprio was born on November 11, 1974, in Los Angeles, California. He began his career as a child actor in television before becoming one of Hollywood's most sought-after leading men. DiCaprio's breakthrough came with 'Titanic' (1997), but his role as con artist Frank Abagnale Jr. in 'Catch Me If You Can' (2002) was another major milestone. Known for his versatility, DiCaprio has worked with top directors like Martin Scorsese and Quentin Tarantino, and he won his first Academy Award for 'The Revenant' (2015).	1.83	1974-11-11	\N	37.jpg	Los Angeles, California, USA	2024-10-23 19:23:17.361+03	2024-10-23 19:23:17.361+03
8	Richard	Gere	Richard Tiffany Gere was born on August 31, 1949, in Philadelphia, Pennsylvania. Gere became a major star in the 1980s, with hit films like 'American Gigolo' (1980) and 'An Officer and a Gentleman' (1982). He is known for his romantic roles, most notably in 'Pretty Woman' (1990). In 'Hachi: A Dog's Tale' (2009), he plays a man who forms a deep bond with a loyal dog. Gere is also a prominent human rights advocate and is deeply involved in activism, particularly in support of Tibet.	1.8	1949-08-31	\N	38.jpg	Philadelphia, Pennsylvania, USA	2024-10-23 19:23:25.269+03	2024-10-23 19:23:25.269+03
9	Morgan	Freeman	Morgan Freeman was born on June 1, 1937, in Memphis, Tennessee, USA. Known for his distinctive deep voice and commanding presence, Freeman's acting career spans decades, making him one of the most respected actors in Hollywood. He rose to fame with his role in 'Street Smart' (1987), which earned him his first Oscar nomination. Freeman has since become known for iconic performances in movies such as 'Driving Miss Daisy' (1989), 'The Shawshank Redemption' (1994), and 'Million Dollar Baby' (2004). His narration skills have also made him the go-to voice for documentaries and commercials.	1.88	1937-06-01	\N	39.jpg	Memphis, Tennessee, USA	2024-10-23 19:23:35.154+03	2024-10-23 19:23:35.154+03
11	Tom	Hanks	Tom Hanks was born on July 9, 1956, in Concord, California, USA. Known as one of the most beloved actors in Hollywood, Hanks has starred in numerous iconic films, including 'Forrest Gump' (1994), 'Cast Away' (2000), and 'Saving Private Ryan' (1998). In 'Catch Me If You Can' (2002), Hanks plays Carl Hanratty, an FBI agent chasing down a young con artist played by Leonardo DiCaprio. Hanks is celebrated for his versatility, warmth, and the emotional depth he brings to his roles.	1.83	1956-07-09	\N	41.jpg	Concord, California, USA	2024-10-23 19:24:12.941+03	2024-10-23 19:24:12.941+03
16	Lance	Reddick	Lance Reddick was born on December 31, 1962, in Baltimore, Maryland. Known for his roles in 'The Wire' and 'John Wick' series, Reddick was known for his deep voice and commanding screen presence. He passed away on March 17, 2023.	1.88	1962-12-31	2023-03-17	46.jpg	Baltimore, Maryland, USA	2024-10-28 17:57:28.658+03	2024-10-28 17:57:28.658+03
17	Joaquin	Phoenix	Joaquin Rafael Phoenix was born on October 28, 1974, in San Juan, Puerto Rico. Known for intense performances in films like 'Joker' (2019), which earned him an Academy Award, Phoenix is known for his commitment to his roles.	1.73	1974-10-28	\N	47.jpg	San Juan, Puerto Rico	2024-10-28 17:57:40.11+03	2024-10-28 17:57:40.11+03
18	Audrey	Fleurot	Audrey Fleurot was born on July 6, 1977, in Mantes-la-Jolie, France. Known for her role in 'The Intouchables' and the hit TV series 'Spiral', Fleurot is celebrated in French cinema.	1.75	1977-07-06	\N	48.jpg	Mantes-la-Jolie, France	2024-10-28 17:57:54.78+03	2024-10-28 17:57:54.78+03
2	Robert	Downey Jr.	Robert John Downey Jr. was born on April 4, 1965, in Manhattan, New York. His father, Robert Downey Sr., was a filmmaker, and his mother, Elsie Ford, was an actress. Downey began acting as a child and later became known for his versatility and charisma in films like 'Chaplin' (1992), which earned him an Academy Award nomination. His career resurgence came with his role as Tony Stark/Iron Man in the Marvel Cinematic Universe, where he became a global icon. Despite a troubled past with substance abuse, Downey has turned his life around and is now one of Hollywood's highest-paid actors.	1.74	1965-04-04	\N	32.jpg	New York City, New York, USA	2024-10-23 19:22:53.287+03	2024-10-23 19:22:53.287+03
3	Tim	Robbins	Timothy Francis Robbins was born on October 16, 1958, in West Covina, California. He is an actor, screenwriter, director, producer, and musician, known for his deep voice and towering height. Robbins gained critical acclaim for his role as Andy Dufresne in 'The Shawshank Redemption' (1994), widely regarded as one of the best films ever made. His other notable works include 'Mystic River' (2003), for which he won an Academy Award. Robbins is also politically active, known for his activism and humanitarian efforts.	1.96	1958-10-16	\N	33.jpg	West Covina, California, USA	2024-10-23 19:22:58.736+03	2024-10-23 19:22:58.736+03
4	Matthew	McConaughey	Matthew David McConaughey was born on November 4, 1969, in Uvalde, Texas. He started his career in romantic comedies, but his career took a dramatic turn with roles in films like 'Dallas Buyers Club' (2013), for which he won the Academy Award for Best Actor, and 'Interstellar' (2014), where he played a NASA pilot on a mission to save humanity. McConaughey is known for his distinct Southern drawl, charisma, and philosophical outlook on life.	1.82	1969-11-04	\N	34.jpg	Uvalde, Texas, USA	2024-10-23 19:23:04.968+03	2024-10-23 19:23:04.968+03
14	Dan	Stevens	Daniel Jonathan Stevens was born on October 10, 1982, in Croydon, England. He gained fame with his role in 'Downton Abbey' and went on to star in 'Beauty and the Beast' (2017). Stevens is recognized for his range across genres, from drama to fantasy.	1.83	1982-10-10	\N	44.jpg	Croydon, England, UK	2024-10-28 17:57:00.61+03	2024-10-28 17:57:00.61+03
19	Tom	Cruise	Thomas Cruise Mapother IV, known as Tom Cruise, was born on July 3, 1962, in Syracuse, New York. Known for his roles in 'Mission: Impossible' series and 'Top Gun', Cruise is one of Hollywood's most recognizable action stars.	1.70	1962-07-03	\N	49.jpg	Syracuse, New York, USA	2024-10-28 17:58:07.797+03	2024-10-28 17:58:07.797+03
20	Rebecca	Ferguson	Rebecca Louisa Ferguson Sundström was born on October 19, 1983, in Stockholm, Sweden. Known for her roles in 'Mission: Impossible' series and 'Dune', Ferguson is known for her sophisticated on-screen presence.	1.70	1983-10-19	\N	50.jpg	Stockholm, Sweden	2024-10-28 17:58:18.393+03	2024-10-28 17:58:18.393+03
23	Henry	Cavill	Henry William Dalgliesh Cavill was born on May 5, 1983, in Jersey, Channel Islands. Best known for his roles as Superman in the DC Extended Universe and Geralt of Rivia in 'The Witcher' series, Cavill is celebrated for his strong screen presence and dedication to his roles.	1.85	1983-05-05	\N	53.jpg	Jersey, Channel Islands, UK	2024-10-28 22:11:33.897+03	2024-10-28 22:11:33.897+03
5	Russell	Crowe	Russell Ira Crowe was born on April 7, 1964, in Wellington, New Zealand. He gained international fame for his role as the Roman general Maximus Decimus Meridius in 'Gladiator' (2000), for which he won the Academy Award for Best Actor. Crowe has also received critical acclaim for his performances in films like 'A Beautiful Mind' (2001) and 'The Insider' (1999). Known for his intense acting style, Crowe is one of the most celebrated actors of his generation.	1.82	1964-04-07	\N	35.jpg	Wellington, New Zealand	2024-10-23 19:23:09.423+03	2024-10-23 19:23:09.423+03
10	Omar	Sy	Omar Sy was born on January 20, 1978, in Trappes, Yvelines, France. He gained international fame for his role in the French film 'Intouchables' (2011), where he played Driss, a man hired to care for a quadriplegic aristocrat, Philippe, in one of the most heartwarming and humorous stories of friendship. Sy's performance earned him widespread recognition, including a César Award for Best Actor. Omar Sy has also appeared in Hollywood films like 'Jurassic World' (2015) and 'X-Men: Days of Future Past' (2014).	1.90	1978-01-20	\N	40.jpg	Trappes, Yvelines, France	2024-10-23 19:24:04.673+03	2024-10-23 19:24:04.673+03
13	Anne	Hathaway	Anne Jacqueline Hathaway was born on November 12, 1982, in Brooklyn, New York. She is known for her versatility in films like 'Les Misérables' (2012), which earned her an Academy Award, and 'The Devil Wears Prada' (2006). Hathaway is celebrated for her charisma and ability to perform a wide range of roles.	1.73	1982-11-12	\N	43.jpg	Brooklyn, New York, USA	2024-10-28 17:56:45.175+03	2024-10-28 17:56:45.175+03
15	Ian	McShane	Ian David McShane was born on September 29, 1942, in Blackburn, Lancashire, England. Known for his charismatic presence, McShane gained critical acclaim for his roles in 'Deadwood' and 'American Gods'.	1.75	1942-09-29	\N	45.jpg	Blackburn, Lancashire, England, UK	2024-10-28 17:57:14.558+03	2024-10-28 17:57:14.558+03
21	Simon	Pegg	Simon John Pegg was born on February 14, 1970, in Gloucester, England. Known for his work in the 'Cornetto Trilogy' (Shaun of the Dead, Hot Fuzz, The World's End), Pegg has established himself as a versatile actor and comedian. He is also known for his role as Benji Dunn in the 'Mission: Impossible' series.	1.78	1970-02-14	\N	51.jpg	Gloucester, England, UK	2024-10-28 22:11:08.978+03	2024-10-28 22:11:08.978+03
22	Jeremy	Renner	Jeremy Lee Renner was born on January 7, 1971, in Modesto, California. Known for his roles in 'The Hurt Locker' (2008), for which he received an Academy Award nomination, and as Clint Barton/Hawkeye in the Marvel Cinematic Universe. Renner is celebrated for his intensity and skill in action roles.	1.75	1971-01-07	\N	52.jpg	Modesto, California, USA	2024-10-28 22:11:23.035+03	2024-10-28 22:11:23.035+03
24	Laurence	Fishburne	Laurence Fishburne, born on July 30, 1961, in Augusta, Georgia, USA, is an acclaimed actor, producer, and playwright celebrated for his powerful screen presence and versatile performances. He first gained attention in Francis Ford Coppola’s 'Apocalypse Now' (1979) and later became widely recognized for his role as Morpheus in 'The Matrix' trilogy (1999-2003). Fishburne's notable works include roles in 'Boyz n the Hood' (1991), 'What's Love Got to Do with It' (1993), for which he received an Academy Award nomination, and his portrayal of Nelson Mandela in 'Mandela' (1987). A three-time Emmy Award winner and Tony Award recipient, Fishburne is respected for his significant contributions to both stage and screen. Off-screen, he has been an advocate for social issues and serves as an ambassador for UNICEF.	1.84	1961-07-30	\N	9f426972-ac0d-4c6c-be43-e9d291349029.webp	Augusta, Georgia, USA	2024-10-29 19:28:49.315+03	2024-10-29 19:28:49.315+03
\.


--
-- Data for Name: director_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.director_users (id, "directorId", "userId") FROM stdin;
\.


--
-- Data for Name: directors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directors (id, name, surname, description, birthday, "dateOfDeath", image, "placeOfBirth", "createdAt", "updatedAt") FROM stdin;
1	Chad	Stahelski	Chad Stahelski was born on September 20, 1968, in Palmer, Massachusetts, USA. He is a former stuntman and stunt coordinator who rose to prominence as a film director. Stahelski is best known for directing the 'John Wick' film series, starting with the first film in 2014. Before his directorial debut, he worked as a stunt double for Keanu Reeves in 'The Matrix' trilogy and coordinated stunts for numerous action films. Stahelski's background in martial arts and stunt work helped create the intense, well-choreographed action sequences for which the 'John Wick' franchise is renowned.	1968-09-20	\N	18.jpg	Palmer, Massachusetts, USA	2024-10-23 20:08:13.544+03	2024-10-23 20:08:13.544+03
2	Jon	Favreau	Jon Favreau was born on October 19, 1966, in Queens, New York, USA. Favreau is an actor, producer, and director who gained recognition for his role in 'Swingers' (1996) and later as the director of 'Iron Man' (2008), which kickstarted the Marvel Cinematic Universe. His directorial style in 'Iron Man' set the tone for the MCU's mix of action, humor, and character development. Favreau has also directed 'Iron Man 2' (2010) and several other successful films, including 'The Jungle Book' (2016) and 'The Lion King' (2019). He is also the creator of the Disney+ series 'The Mandalorian'.	1966-10-19	\N	19.jpg	Queens, New York, USA	2024-10-23 20:08:18.169+03	2024-10-23 20:08:18.169+03
3	Frank	Darabont	Frank Darabont was born on January 28, 1959, in Montbéliard, France, to Hungarian parents. He is best known for adapting Stephen King's works into critically acclaimed films, including 'The Shawshank Redemption' (1994), which is regarded as one of the greatest films of all time. Darabont also directed 'The Green Mile' (1999) and 'The Mist' (2007). His storytelling often revolves around themes of hope, redemption, and the human spirit. Darabont began his career as a screenwriter and went on to become a highly respected director, with a particular affinity for King’s stories.	1959-01-28	\N	20.jpg	Montbéliard, Doubs, France	2024-10-23 20:08:24.608+03	2024-10-23 20:08:24.608+03
5	Ridley	Scott	Ridley Scott was born on November 30, 1937, in South Shields, England. He is a legendary filmmaker known for creating visually stunning and atmospheric films across various genres. Scott’s breakthrough came with 'Alien' (1979), followed by the iconic science fiction film 'Blade Runner' (1982). In 2000, Scott directed 'Gladiator', a historical epic that won five Academy Awards, including Best Picture. Scott's meticulous attention to detail and world-building has established him as one of the greatest directors of his era. He has also directed 'Black Hawk Down' (2001), 'The Martian' (2015), and 'House of Gucci' (2021).	1937-11-30	\N	22.jpg	South Shields, England, UK	2024-10-23 20:08:32.909+03	2024-10-23 20:08:32.909+03
6	Olivier	Nakache	Olivier Nakache was born on April 15, 1973, in Suresnes, Hauts-de-Seine, France. Nakache, along with Éric Toledano, co-directed 'Intouchables' (2011), one of the most successful French films of all time. The duo has directed several films together, often focusing on stories of unlikely friendships and social dynamics. Their unique storytelling approach blends humor and heart, appealing to audiences worldwide. Their other works include 'Samba' (2014) and 'The Specials' (2019).	1973-04-15	\N	23.jpg	Suresnes, Hauts-de-Seine, France	2024-10-23 20:08:38.58+03	2024-10-23 20:08:38.58+03
7	Éric	Toledano	Éric Toledano was born on July 3, 1971, in Paris, France. He is a film director and writer, often collaborating with Olivier Nakache. Together, they co-directed the global hit 'Intouchables' (2011), which tells the heartwarming story of the bond between a quadriplegic man and his caregiver. Their films often explore themes of human connection, humor, and cultural integration. Toledano and Nakache are known for their empathetic and comedic filmmaking style, which resonates with diverse audiences.	1971-07-03	\N	24.jpg	Paris, France	2024-10-23 20:08:44.621+03	2024-10-23 20:08:44.621+03
8	Steven	Spielberg	Steven Spielberg was born on December 18, 1946, in Cincinnati, Ohio, USA. He is one of the most influential and successful directors in the history of cinema. Spielberg has directed numerous iconic films, including 'Jaws' (1975), 'E.T. the Extra-Terrestrial' (1982), 'Jurassic Park' (1993), 'Schindler’s List' (1993), and 'Catch Me If You Can' (2002). His films often balance entertainment with emotional depth and address themes such as wonder, human connection, and historical events. Spielberg is a multiple Academy Award winner and remains a pioneering force in the industry.	1946-12-18	\N	25.jpg	Cincinnati, Ohio, USA	2024-10-23 20:08:50.153+03	2024-10-23 20:08:50.153+03
9	Lasse	Hallström	Lasse Hallström was born on June 2, 1946, in Stockholm, Sweden. He is a Swedish film director known for his ability to bring emotional and poignant stories to life. Hallström first gained international recognition with 'My Life as a Dog' (1985), and later directed well-received films such as 'What's Eating Gilbert Grape' (1993) and 'The Cider House Rules' (1999). In 'Hachi: A Dog’s Tale' (2009), Hallström beautifully tells the story of a loyal dog and its bond with its owner. His films often focus on relationships, human emotions, and heartfelt storytelling.	1946-06-02	\N	26.jpg	Stockholm, Sweden	2024-10-23 20:08:56.034+03	2024-10-23 20:08:56.034+03
15	Zack	Snyder	Zack Snyder, born on March 1, 1966, in Green Bay, Wisconsin, USA, is a celebrated director, producer, and screenwriter known for his visually distinct and stylized approach to filmmaking. He gained fame with the film '300' (2006), and continued with popular titles such as 'Watchmen' (2009), 'Man of Steel' (2013), and the widely discussed 'Zack Snyder's Justice League' (2021). Snyder's work is known for its dark themes, epic storytelling, and innovative use of visuals.	1966-03-01	\N	08334609-8b9f-44db-a97d-70ba74e242ce.jpg	Green Bay, Wisconsin, USA	2024-10-29 19:23:09.728+03	2024-10-29 19:23:09.728+03
4	Christopher	Nolan	Christopher Nolan was born on July 30, 1970, in London, England. Nolan is one of the most successful and acclaimed directors of his generation, known for his complex, non-linear storytelling and thought-provoking films. He gained international fame with 'Memento' (2000), and has since directed many blockbuster films, including 'The Dark Knight' trilogy, 'Inception' (2010), 'Dunkirk' (2017), and 'Interstellar' (2014). His films often explore deep philosophical themes while pushing the boundaries of visual effects and narrative structure.	1970-07-30	\N	21.jpg	London, England, UK	2024-10-23 20:08:29.265+03	2024-10-23 20:08:29.265+03
10	Chris	Sanders	Chris Sanders was born and raised in Colorado and fell in love with animation at the age of ten after seeing Ward Kimball's animated shorts on The Wonderful World of Disney. He began drawing and applied to CalArts after his grandmother told him about the school's animation program. He majored in character animation and graduated in 1984, going on to work at Marvel Comics. He helped draw characters for the show Muppet Babies (1984). He then moved to the Walt Disney Company in 1987, working in the visual development department. After a brief stint on The Rescuers Down Under (1990), Sanders rocketed to the top of Disney animation with his work on Beauty and the Beast (1991) and The Lion King (1994). He helped write Disney's 1998 animated hit Mulan (1998), which led to him writing, directing, and providing voice work on Lilo & Stitch (2002). Sanders moved to Dreamworks, where he co-wrote, co-directed, and did character design for How to Train Your Dragon (2010). Regardless of which studio he worked for, he became a recognizable force as an animator in both cel and CGI films.	1962-03-12	\N	27.jpg	Colorado Springs, Colorado, USA	2024-10-23 20:11:20.8+03	2024-10-23 20:11:20.8+03
11	Jeffrey Jacob	Abrams	Jeffrey Jacob Abrams, widely known as J.J. Abrams, was born on June 27, 1966, in New York City, USA. A multi-talented director, producer, and writer, Abrams is celebrated for his contributions to both television and film. Known for his work on 'Lost,' 'Alias,' and his reboot of iconic film franchises such as 'Star Trek' (2009) and 'Star Wars: The Force Awakens' (2015), Abrams is recognized for his innovative storytelling, blending mystery, action, and engaging character development.	1966-06-27	\N	28.jpg	New York City, New York, USA	2024-10-28 22:36:55.245+03	2024-10-28 22:36:55.245+03
12	Brad	Bird	Brad Bird, born on September 24, 1957, in Kalispell, Montana, USA, is an award-winning animator, director, and screenwriter. He is renowned for his animated films, including 'The Iron Giant' (1999), 'The Incredibles' (2004), and 'Ratatouille' (2007), each praised for their imaginative storytelling and visual innovation. Bird has also ventured into live-action, directing 'Mission: Impossible - Ghost Protocol' (2011), showcasing his versatility and talent across genres.	1957-09-24	\N	29.jpg	Kalispell, Montana, USA	2024-10-28 22:37:04.225+03	2024-10-28 22:37:04.225+03
13	Christopher	McQuarrie	Christopher McQuarrie, born on October 25, 1968, in Princeton, New Jersey, USA, is an accomplished screenwriter, director, and producer. McQuarrie first gained recognition with his Oscar-winning screenplay for 'The Usual Suspects' (1995) and has since become a key figure in the 'Mission: Impossible' franchise, directing both 'Mission: Impossible - Rogue Nation' (2015) and 'Mission: Impossible - Fallout' (2018). Known for his gripping storytelling and action sequences, McQuarrie continues to be a driving force in action cinema.	1968-10-25	\N	30.jpg	Princeton, New Jersey, USA	2024-10-28 22:37:19.299+03	2024-10-28 22:37:19.299+03
\.


--
-- Data for Name: movie_actors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_actors (id, "movieId", "actorId") FROM stdin;
1	1	10
2	1	12
3	2	1
4	3	1
5	4	2
6	5	3
7	6	4
8	7	5
9	8	6
10	8	10
11	9	7
12	9	11
13	10	8
14	6	13
15	1	14
16	2	15
17	2	16
18	3	15
19	3	16
21	7	17
22	11	19
23	11	21
24	12	19
25	12	21
26	13	19
27	13	21
28	13	20
29	14	19
30	14	21
31	14	20
32	15	1
33	15	15
34	15	16
35	16	1
36	16	15
37	16	16
38	14	23
39	29	23
40	29	5
52	29	24
53	3	24
54	2	24
55	15	24
56	16	24
57	5	9
\.


--
-- Data for Name: movie_directors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_directors (id, "movieId", "directorId") FROM stdin;
1	1	10
8	4	2
9	5	3
10	6	4
11	7	5
12	8	6
13	8	7
14	9	8
15	10	9
2	2	1
3	3	1
16	15	1
17	16	1
18	11	11
19	12	12
20	13	13
21	14	13
22	29	15
\.


--
-- Data for Name: movie_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_users (id, "movieId", "userId") FROM stdin;
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (id, title, description, "creationDate", genre, image, budget, "createdAt", "updatedAt") FROM stdin;
8	The Intouchables	An aristocrat who becomes a quadriplegic after a paragliding accident hires a young man from the projects to be his caregiver. Despite their differences, they form an unlikely and heartwarming friendship.	2011-11-02	Biography, Comedy, Drama	8.jpg	10500000	2024-10-23 19:18:56.939+03	2024-10-23 19:18:56.939+03
1	The Call of the Wild	The Call of the Wild is a vibrant story of Buck, a big and kindhearted dog, a crossbreed between a St. Bernard and a Scotch shepherd whose carefree life of leisure was suddenly upset when he was stolen from his home in Santa Clara County, California and deported up north, to be sold in Skagway, Alaska, and taken further north, to Dawson City, Yukon, during the late 1890s Klondike Gold Rush, when strong sled dogs were in high demand. As a newcomer to the dog team delivery service - and not before long their front-runner - Buck, a dog like no other, who had been spoiled, and who had suffered, but he could not be broken, is having the time of his life. Forced to fight to survive, eventually taken by his last owner, John Thornton, to proximity of the Arctic Circle, somewhere between Yukon and Alaska, he progressively depends on his primal instincts, sheds the comforts of civilization and responds to "the call of the wild", as master of his own.	2020-02-21	Adventure, Drama	1.jpg	125000000	2024-10-23 19:16:58.768+03	2024-10-23 19:16:58.768+03
2	John Wick	John Wick is a retired hitman seeking vengeance for the killing of his beloved dog, a final gift from his deceased wife. Wick's quest for revenge unleashes his lethal set of skills as he takes on a powerful mob boss and his army of assassins.	2014-10-24	Action, Thriller	2.jpg	20000000	2024-10-23 19:18:21.201+03	2024-10-23 19:18:21.201+03
3	John Wick: Chapter 2	John Wick is forced back into the criminal underworld to repay a debt, but soon discovers a larger conspiracy that threatens his very life. He faces old friends and new enemies in a battle for survival and vengeance.	2017-02-10	Action, Crime, Thriller	3.jpg	40000000	2024-10-23 19:18:26.174+03	2024-10-23 19:18:26.174+03
4	Iron Man	After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil and becomes the superhero Iron Man.	2008-05-02	Action, Sci-Fi	4.jpg	140000000	2024-10-23 19:18:33.738+03	2024-10-23 19:18:33.738+03
5	The Shawshank Redemption	Wrongfully imprisoned for murder, Andy Dufresne forms a powerful bond with fellow inmate Red as he navigates life within Shawshank prison. Over time, he finds hope and purpose in the most unlikely of places.	1994-09-23	Drama	5.jpg	25000000	2024-10-23 19:18:38.486+03	2024-10-23 19:18:38.486+03
6	Interstellar	In a dystopian future where Earth is facing extinction, a group of astronauts travels through a wormhole in search of a new home for humanity. Led by pilot Cooper, they face incredible challenges in their mission to save mankind.	2014-11-07	Adventure, Drama, Sci-Fi	6.jpg	165000000	2024-10-23 19:18:47.059+03	2024-10-23 19:18:47.059+03
7	Gladiator	Maximus Decimus Meridius, a Roman general, is betrayed and sold into slavery after his family is murdered. Forced to fight as a gladiator, he rises through the ranks and seeks revenge against the corrupt emperor who wronged him.	2000-05-05	Action, Adventure, Drama	7.jpg	103000000	2024-10-23 19:18:52.225+03	2024-10-23 19:18:52.225+03
15	John Wick: Chapter 3 – Parabellum	After killing a member of the shadowy international assassin's guild, John Wick finds himself stripped of the organization's protective services and with a massive bounty on his head. Now he must fight his way through countless assassins to survive and escape New York City.	2019-05-17	Action, Thriller	15.jpg	75000000	2024-10-28 22:18:41.286+03	2024-10-28 22:18:41.286+03
16	John Wick: Chapter 4	With the price on his head ever increasing, John Wick uncovers a path to defeating the High Table. But before he can earn his freedom, he must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.	2023-03-24	Action, Thriller	16.jpg	100000000	2024-10-28 22:19:16.83+03	2024-10-28 22:19:16.83+03
9	Catch Me If You Can	Frank Abagnale Jr., a skilled con artist, successfully forges millions of dollars' worth of checks while posing as a Pan Am pilot, a doctor, and a legal prosecutor, all while being pursued by FBI agent Carl Hanratty.	2002-12-25	Biography, Crime, Drama	9.jpg	52000000	2024-10-23 19:19:03.836+03	2024-10-23 19:19:03.836+03
10	Hachi: A Dog's Tale	Based on the true story of a loyal dog named Hachiko, who waited every day for his deceased owner at the train station. His unwavering devotion becomes a symbol of love and loyalty, transcending time and circumstances.	2009-06-13	Drama, Family	10.jpg	16000000	2024-10-23 19:19:09.641+03	2024-10-23 19:19:09.641+03
11	Mission: Impossible III	Ethan Hunt is lured back into action when a ruthless arms dealer, Owen Davian, threatens those closest to him. As Hunt faces his most intense mission yet, he must navigate a series of impossible tasks, high-stakes chases, and deadly confrontations to protect both his loved ones and global security.	2006-05-05	Action, Adventure, Thriller	11.jpg	150000000	2024-10-28 22:17:51.581+03	2024-10-28 22:17:51.581+03
13	Mission: Impossible – Rogue Nation	Ethan Hunt and his team take on their most powerful enemy yet, the Syndicate, an international rogue organization as skilled as they are. To dismantle this deadly threat, Hunt embarks on a relentless pursuit across continents, risking everything in the name of global security.	2015-07-31	Action, Adventure, Thriller	13.jpg	150000000	2024-10-28 22:18:14.119+03	2024-10-28 22:18:14.119+03
14	Mission: Impossible – Fallout	When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfill his original briefing, the CIA begins to question his loyalty and his motives. Hunt finds himself in a race against time, hunted by assassins and former allies, while trying to prevent a global catastrophe.	2018-07-27	Action, Adventure, Thriller	14.jpg	178000000	2024-10-28 22:18:23.322+03	2024-10-28 22:18:23.322+03
18	Top Gun: Maverick	Top Gun: Maverick is a high-octane action drama following Captain Pete "Maverick" Mitchell, one of the Navy's top aviators, who has pushed the limits as a courageous test pilot and avoided the advancement in rank that would ground him. More than thirty years after serving in the elite fighter squadron, Maverick is called back to train a new generation of Top Gun graduates for a highly dangerous mission. Struggling with the ghosts of his past and the complex responsibilities of mentorship, Maverick must face his deepest fears to bring his team home safely.	2022-05-27	Action, Drama	17.jpg	170000000	2024-10-29 13:09:15.426+03	2024-10-29 13:09:15.426+03
12	Mission: Impossible – Ghost Protocol	Ethan Hunt and his team are framed for a bombing of the Kremlin, forcing them to go off the grid in an attempt to clear their names and prevent a nuclear disaster. Without resources or backup, the team must rely on their skills to complete their most dangerous mission yet.	2011-12-21	Action, Adventure, Thriller	12.jpg	145000000	2024-10-28 22:17:58.266+03	2024-10-28 22:17:58.266+03
29	Man of Steel	Man of Steel follows Clark Kent, a young man with extraordinary powers, who learns of his origins as an alien from the distant planet Krypton. Struggling to find his place in the world, he must come to terms with his identity and his mission on Earth. When Earth is threatened by his own kind, Clark embraces his destiny as Superman to protect humanity from annihilation. With courage and sacrifice, he becomes the hero destined to inspire mankind.	2013-06-14	Action, Adventure, Sci-Fi	d7350cbc-1b80-4d6c-8264-eb8f2483a10c.jpg	225000000	2024-10-29 19:10:49.006+03	2024-10-29 19:10:49.006+03
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, surname, email, password, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: actor_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.actor_users_id_seq', 90, true);


--
-- Name: actors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.actors_id_seq', 24, true);


--
-- Name: director_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.director_users_id_seq', 61, true);


--
-- Name: directors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directors_id_seq', 15, true);


--
-- Name: movie_actors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_actors_id_seq', 57, true);


--
-- Name: movie_directors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_directors_id_seq', 22, true);


--
-- Name: movie_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_users_id_seq', 233, true);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_id_seq', 31, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 34, true);


--
-- Name: actor_users actor_users_actorId_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actor_users
    ADD CONSTRAINT "actor_users_actorId_userId_key" UNIQUE ("actorId", "userId");


--
-- Name: actor_users actor_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actor_users
    ADD CONSTRAINT actor_users_pkey PRIMARY KEY (id);


--
-- Name: actors actors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actors
    ADD CONSTRAINT actors_pkey PRIMARY KEY (id);


--
-- Name: director_users director_users_directorId_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.director_users
    ADD CONSTRAINT "director_users_directorId_userId_key" UNIQUE ("directorId", "userId");


--
-- Name: director_users director_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.director_users
    ADD CONSTRAINT director_users_pkey PRIMARY KEY (id);


--
-- Name: directors directors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directors
    ADD CONSTRAINT directors_pkey PRIMARY KEY (id);


--
-- Name: movie_actors movie_actors_movieId_actorId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_actors
    ADD CONSTRAINT "movie_actors_movieId_actorId_key" UNIQUE ("movieId", "actorId");


--
-- Name: movie_actors movie_actors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_actors
    ADD CONSTRAINT movie_actors_pkey PRIMARY KEY (id);


--
-- Name: movie_directors movie_directors_movieId_directorId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_directors
    ADD CONSTRAINT "movie_directors_movieId_directorId_key" UNIQUE ("movieId", "directorId");


--
-- Name: movie_directors movie_directors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_directors
    ADD CONSTRAINT movie_directors_pkey PRIMARY KEY (id);


--
-- Name: movie_users movie_users_movieId_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_users
    ADD CONSTRAINT "movie_users_movieId_userId_key" UNIQUE ("movieId", "userId");


--
-- Name: movie_users movie_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_users
    ADD CONSTRAINT movie_users_pkey PRIMARY KEY (id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: actor_users actor_users_actorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actor_users
    ADD CONSTRAINT "actor_users_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES public.actors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: actor_users actor_users_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actor_users
    ADD CONSTRAINT "actor_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: director_users director_users_directorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.director_users
    ADD CONSTRAINT "director_users_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES public.directors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: director_users director_users_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.director_users
    ADD CONSTRAINT "director_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movie_actors movie_actors_actorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_actors
    ADD CONSTRAINT "movie_actors_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES public.actors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movie_actors movie_actors_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_actors
    ADD CONSTRAINT "movie_actors_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movie_directors movie_directors_directorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_directors
    ADD CONSTRAINT "movie_directors_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES public.directors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movie_directors movie_directors_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_directors
    ADD CONSTRAINT "movie_directors_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movie_users movie_users_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_users
    ADD CONSTRAINT "movie_users_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movie_users movie_users_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_users
    ADD CONSTRAINT "movie_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

