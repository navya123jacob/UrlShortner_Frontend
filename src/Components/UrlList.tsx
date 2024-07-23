import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { useFetchUrlsQuery, useDeleteLinkMutation } from '../Store/apiSlice';

interface UrlListProps {
  change: number;
}

const UrlList: React.FC<UrlListProps> = ({ change }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?._id;

  const { data: urls, error, isLoading, refetch } = useFetchUrlsQuery(user.id);
  const [deleteLink] = useDeleteLinkMutation();

  useEffect(() => {
    refetch();
  }, [change, refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {(error as Error).message}</p>;

  const handleDelete = async (urlId: string) => {
    try {
      await deleteLink({ urlId }).unwrap();
      refetch();
    } catch (err) {
      console.error('Failed to delete the link:', err);
    }
  };

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {urls?.data?.map((url: any) => (
        <li key={url._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '5px' }}>
          <span style={{ flexGrow: 1, marginRight: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {url.title}
          </span>
          <a href={url.original_url} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textDecoration: 'none', color: '#333' }}>
            {url.custom_url}
          </a>
          <span style={{ padding: '5px 10px', fontSize: '0.9em', color: 'white', backgroundColor: '#ff5c5c', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleDelete(url._id)}>
            Delete
          </span>
        </li>
      ))}
    </ul>
  );
};

export default UrlList;
