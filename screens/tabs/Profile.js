import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../components/UserProfile";

export const ME = gql`
  {
    me {
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
  const { loading, data } = useQuery(ME);
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};