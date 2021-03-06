@extends('layouts.dogukan')

@section('pageTitle')
{{ $tag->name }} etiket arşivi - {!! config('setting.Title') !!}@endsection
@section('pageDesc')
{{ $tag->name }} isimli etiketi içeren yazılar arşivi. Doğukan Öksüz, Freelance Web Developer.@endsection
@section('content')
    <main id="Main">
        <div class="container">
            <div class="row">
                <div class="col-12 mb-3">
                    <h3>{{ $tag->name }} etiketindeki yazılar listeleniyor.</h3>
                    <br>
                </div>
                <section class="col-lg-8" id="Content">
                    @foreach ($posts as $post)
                        <div class="homePageBox">
                            <div class="row">
                                <div class="col-sm-5 mb-md-4 mb-sm-4 mb-4">
                                    <a href="{{ route('posts', $post->slug) }}">
                                        <img alt="{{ $post->title }}" src="{{ asset($post->thumbnail_path) }}">
                                    </a>
                                </div>
                                <div class="col-sm-7">
                                    <h2>
                                        <a href="{{ route('posts', $post->slug) }}">{{ $post->title }}</a>
                                    </h2>
                                    <p>{!! substr(strip_tags($post->content), 0, 230) !!}...</p>
                                </div>
                                <div class="col-12">
                                    <div class="homePageBoxDesc">
                                        {{ $post->created_at->formatLocalized(' %d %B %Y') }} tarihinde
                                        @php
                                            $count = count($post->category()->get())
                                        @endphp
                                        @foreach ($post->category()->get() as $tag)
                                            <a href="{{ route('category', $tag->slug) }}">{{ $tag->title }}</a>
                                            @php
                                                if (!(--$count <= 0)) {
                                                    echo ',';
                                                }
                                            @endphp
                                        @endforeach
                                        kategorisinde {{ $post->user()->first()->name }} tarafından yayınlanmıştır.
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                    <nav>
                        {{ $posts->links() }}
                    </nav>
                </section>
                @include('layouts.sidebar')
            </div>
        </div>

    </main>
@endsection
