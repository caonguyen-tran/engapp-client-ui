import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import CollectionDetailFooter from "../../../components/Footer/CollectionDetailFooter";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import LoadingView from "../../../components/lotties/LoadingView";
import EmptyView from "../../../components/lotties/EmptyView";
import ListWordView from "../Word/ListWordView";
import CreateNewWord from "../../../components/screens/Word/CreateNewWord";
import NoActiveView from "../../../components/lotties/NoActiveView";
import { useDownload } from "../../../context/DownloadContext";

const CollectionDetail = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const { collectionId } = route.params;
  const [isOwner, setIsOwner] = useState(false);
  const [eventChange, setEventChange] = useState(0);
  const {setDownload} = useDownload()

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const ownerRes = await authApi(token).get(
          endpoints["collection-service"]["inspect-owner"](collectionId)
        );
        const wordRes = await authApi(token).get(
          endpoints["word-service"]["get-words-by-collection"](collectionId)
        );

        setData(wordRes.data.data);
        setIsOwner(ownerRes.data.data);
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    };
    console.log(eventChange);
    fetch();
  }, [eventChange]);

  const refreshData = () => {
    setEventChange(eventChange + 1);
  };


  return (
    <>
      <HeaderScreen label="Từ vựng" callback={() => navigation.goBack()} />

      {loading ? (
        <LoadingView />
      ) : (
        <>
          {data.length !== 0 ? (
            <>
              <ScrollView>
                <ListWordView data={data} />
              </ScrollView>
              <CollectionDetailFooter
                label="Tải bộ từ"
                navigation={navigation}
                collectionId={collectionId}
                setDownload={setDownload}
              />
            </>
          ) : (
            <NoActiveView
              textAlert="Không có từ vựng nào trong bộ sưu tập này!"
              visible={false}
            />
          )}
        </>
      )}
      {isOwner ? (
        <CreateNewWord collectionId={collectionId} onRefresh={refreshData} />
      ) : (
        <></>
      )}
    </>
  );
};

export default CollectionDetail;
