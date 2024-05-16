import Layout from "@/components/layout/layout";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { MovieObj } from "../movie/[movieId]";
import MovieGridItem from "@/components/ui/MovieGridItem";
import { connectDB } from "@/utils/db-util";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]";
import User, { userMovieObj } from "@/models/userModel";
import { GetServerSidePropsContext } from "next";
import { Masonry, ResponsiveMasonry } from "@/utils/imports";
import SearchComponent from "@/components/profile/Search";
import { useState } from "react";

type favoriteProps = {
  movies: Array<userMovieObj>;
};

const favorite = ({ movies }: favoriteProps) => {
  const [value, setvalue] = useState("");
  const [moviesShown, setmoviesShown] = useState(movies);
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value.toLowerCase();
    setvalue(searchQuery);
    const filteredResults = movies.filter((m) =>
      m.title.toLowerCase().includes(searchQuery)
    );
    setmoviesShown(filteredResults);
  }
  return (
    <Layout>
      <ProfileLayout pageTitle="Favorite">
        <SearchComponent value={value} changeInputHandler={inputHandler} />
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 1200: 2, 1536: 3 }} //1536px -> 2xl || 1200px -> xl
        >
          <Masonry>
            {moviesShown.map((movie) => (
              <div className="m-4" key={movie.id}>
                <MovieGridItem movie={movie} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </ProfileLayout>
    </Layout>
  );
};

export default favorite;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  await connectDB();
  const session: any = await getServerSession(ctx.req, ctx.res, authOptions);
  const email = session?.user?.email;

  const user = await User.findOne({ email });
  const favMovies = user.favMovies;
  // console.log(favMovies);

  return {
    props: {
      movies: JSON.parse(JSON.stringify(favMovies)),
    },
  };
}
