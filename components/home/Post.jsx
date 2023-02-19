import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { db, firebase } from '../../firebase'


const postFooterIcons = [
    {
        name: "Like",
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
        likedImageUrl: "https://img.icons8.com/ios-glyphs/90/fa314a/like--v1.png"
    },
    {
        name: "Comment",
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/comments.png'
    },
    {
        name: "Share",
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/share.png'
    },
    {
        name: "Save",
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark-ribbon.png'
    },

]



const Post = ({ post }) => {

    const handleLike = post => {
        const currentLikeStatus = !post.likes_by_users.includes(
            firebase.auth().currentUser.email
        )

        db.collection("users").doc(post.owner_email).collection("posts").doc(post.id).update({
            likes_by_users: currentLikeStatus ? firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email) : firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)
        }).then(() => {
            console.log("Updated")
        }).catch(err => {
            console.error("Error", err)
        })
    }

    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <PostFooter post={post} handleLike={handleLike} />
                <Likes post={post} />
                <Captions post={post} />
                <CommentSection post={post} />
                <Comments post={post} />
            </View>
        </View>
    )
}

const PostHeader = ({ post }) => {
    return (
        <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={{ uri: post.profilePicture }} style={styles.userImage} />
                <Text style={{ fontWeight: 'bold', marginLeft: 10, color: "white" }}>{post.username.toLowerCase()}</Text>
            </View>
            <Text style={{ color: "white" }}>...</Text>
        </View>
    )
}

const PostImage = ({ post }) => {
    return (
        <View style={{ width: "100%", height: 450 }}>
            <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
        </View>
    )
}

const PostFooter = ({ handleLike, post }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
            <View style={{ flexDirection: 'row' }}>
                {/* <Icons imgStyle={[styles.footerIcon, { marginRight: 10 }]} imgUrl={postFooterIcons[0].imageUrl} /> */}
                <TouchableOpacity onPress={() => handleLike(post)}>
                    <Image style={[styles.footerIcon, { marginRight: 10 }]} source={{ uri: post.likes_by_users.includes(firebase.auth().currentUser.email) ? postFooterIcons[0].likedImageUrl : postFooterIcons[0].imageUrl }} />
                </TouchableOpacity>
                <Icons imgStyle={[styles.footerIcon, { marginRight: 10 }]} imgUrl={postFooterIcons[1].imageUrl} />
                <Icons imgStyle={[styles.footerIcon, { marginRight: 10 }]} imgUrl={postFooterIcons[2].imageUrl} />
            </View>
            <View>
                <Icons imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
            </View>
        </View>
    )
}

const Icons = ({ imgStyle, imgUrl }) => {
    return (
        <TouchableOpacity>
            <Image source={{ uri: imgUrl }} style={imgStyle} />
        </TouchableOpacity>

    )

}

const Likes = ({ post }) => (
    <View style={{ flexDirection: "row", marginTop: 4 }}>
        <Text style={{ color: "white", fontWeight: "600" }}>{post.likes_by_users.length.toLocaleString('en')} likes</Text>
    </View>
)

const Captions = ({ post }) => (
    <View style={{ marginTop: 4 }}>
        <Text style={{ color: "white" }}>
            <Text style={{ fontWeight: "600" }}>{post.username.toLowerCase()}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const CommentSection = ({ post }) => (
    <View style={{ marginTop: 4 }}>
        {!!post.comments.length && (
            <Text style={{ color: 'gray' }}>
                View {post.comments.length > 1 ? 'all ' : ''}{post.comments.length}{" "}
                {post.comments.length > 1 ? 'Comments' : 'Comment'}
            </Text>
        )}
    </View>
)


const Comments = ({ post }) => (
    <>
        {post.comments.map((comment, index) => (
            <View key={index} style={{ flexDirection: "row", marginTop: 4 }}>
                <Text style={{ color: "white" }}>
                    <Text style={{ fontWeight: "600" }}>{comment.user}</Text>{' '}
                    {comment.comment}
                </Text>
            </View>
        ))}
    </>
)

export default Post

const styles = StyleSheet.create({
    userImage: {
        width: 30, height: 30, borderRadius: 50, borderWidth: 1, borderColor: 'red'
    },
    postImage: {
        height: '100%', resizeMode: "cover"
    },
    footerIcon: {
        width: 25, height: 25
    }
})


