import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    startAfter,
    getDoc,
    where,
} from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

const Category = () => {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lastFetchedListing, setLastFetchedListing] = useState(null);
    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setLoading(true);

                const listingsRef = collection(db, 'listings');
                const q = query(
                    listingsRef,
                    where('type', '==', params.categoryName),
                    orderBy('timestamp', 'desc'),
                    limit(10)
                );

                const querySnap = await getDocs(q);

                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchedListing(lastVisible);

                let listings = [];

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });

                setLoading(false);
                setListings(listings);
            } catch (error) {
                console.error(error);
                toast.error('Could not fetch listings!');
            }
        }

        fetchListings();
    }, [params.categoryName])

    const onFetchMoreListings = async () => {
        try {
            setLoading(true);

            const listingsRef = collection(db, 'listings');
            const q = query(
                listingsRef,
                where('type', '==', params.categoryName),
                orderBy('timestamp', 'desc'),
                startAfter(lastFetchedListing),
                limit(10)
            );

            const querySnap = await getDocs(q);

            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchedListing(lastVisible);

            let listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });

            setLoading(false);
            setListings(prevState => [...prevState, ...listings]);
        } catch (error) {
            console.error(error);
            toast.error('Could not fetch listings!');
        }
    }

    return (
        <div className='category'>
            <header>
                <p className="pageHeader">
                    { params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale' }
                </p>
            </header>

            { loading
                ? <Spinner />
                : listings && listings.length > 0
                    ? (<>
                        <main>
                            <ul className="categoryListings">
                                {listings.map(listing => (
                                    <ListingItem
                                        listing={listing.data}
                                        id={listing.id}
                                        key={listing.id}
                                    />
                                ))}
                            </ul>
                        </main>

                        <br/><br/>

                        {lastFetchedListing && (
                            <p className="loadMore" onClick={onFetchMoreListings}>
                                Load More
                            </p>
                        )}
                       </>)
                    : <p>No listings for {params.categoryName}</p>
            }
        </div>
    );
};

export default Category;