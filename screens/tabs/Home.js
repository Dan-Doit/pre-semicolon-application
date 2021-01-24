import { useQuery } from "react-apollo-hooks";
import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { gql } from "apollo-boost";
import Loader from '../../components/Loader';
import Post from '../../components/Post';

const FEED_QUERY = gql`
{
  seeFeed{
    id
    location
    caption
    user{
      id
      avatar
      username
    }
    files{
      id
      url
    }
    likeCount
    isLiked
    comments{
      id
      text
      user{
        id
        avatar
        username
      }
    }
    createdAt
  }
}
`;



export default () => { 
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  //  refetch를 사용하여 데이터를 다시 로드시킴(위로 스크롤을 올릴경우)
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? (<Loader />) : (data && data.seeFeed && data.seeFeed.map(post => <Post key={post.id} {...post} ></Post>))}
    </ScrollView>
  );
};