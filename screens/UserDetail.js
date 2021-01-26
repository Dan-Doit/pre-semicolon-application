import React from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import { ScrollView } from "react-native";
import UserProfile from "../components/UserProfile";

export const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username)  {
    user{
          id
          avatar
          username
          fullName
          isFollowing
          isSelf
          bio
          followingCount
          followersCount
          postsCount
      }
          posts {
             id
    location
    caption
    user {
      id
      avatar
      username
    }
    files {
      id
      url
    }
    likeCount
    isLiked
    comments {
      id
      text
      user {
        id
        username
      }
    }
    createdAt
          }
      }
    }
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: { username: navigation.getParam("username") }
  });
  data.seeUser.posts.map(post=>console.log("여긴백입니다."+post.id))
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeUser && <UserProfile {...data.seeUser} />
      )}
    </ScrollView>
  );
};