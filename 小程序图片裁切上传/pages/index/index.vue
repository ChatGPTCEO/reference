<template>
    <view>
        <imageCut
            ratio='4:3'
            maxUpload='6'
            uploadUrl='https://common/oss/upload'
            :upHeader='upHeader'
            :upFromData='upFromData'
            @uploadComplete='uploadCompleteHandle'
        ></imageCut>
    </view>
</template>

<script>
    import imageCut from '@/components/imagecut-upload/index.vue'
    export default {
        components:{
            imageCut
        },
        data() {
            return {
                upFromData: {
                        'token':'token'
                },
                upHeader: {
                    'Authorization':'Bearere token',
                }
            }
        },
        methods: {
            uploadCompleteHandle(e) {
                console.log(e)
            }
        }
    }
</script>

<style>

</style>