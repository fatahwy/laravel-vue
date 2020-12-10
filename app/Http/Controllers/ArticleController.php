<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller {

    public function index() {
        $articles = Article::all();

        return $articles->toJson();
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'date' => 'required',
        ]);

        $article = Article::create([
                    'title' => $validatedData['title'],
                    'content' => $validatedData['content'],
                    'date' => $validatedData['date'],
        ]);
        
        if($article) {
            $msg = [
                'success' => true,
                'message' => 'Artikel Berhasil Dibuat',
            ];                
        } else {
            $msg = [
                'success' => false,
                'message' => 'Artikel Gagal Dibuat',
            ];
        }

        return response()->json($msg);
    }

    public function getArticle($id) {
        $article = Article::find($id);
        return $article->toJson();
    }

    public function update(Request $request, $id) {
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $article = Article::find($id);
        $article->title = $validatedData['title'];
        $article->content = $validatedData['content'];
        $article->save();

        $msg = [
            'success' => true,
            'message' => 'Artikel berhasil diperbarui',
        ];

        return response()->json($msg);
    }

    public function delete($id) {
        $article = Article::find($id);
        if (!empty($article)) {
            $article->delete();
            $msg = [
                'success' => true,
                'message' => 'Artikel berhasil dihapus',
            ];
        } else {
            $msg = [
                'success' => false,
                'message' => 'Artikel tidak ditemukan!',
            ];
        }

        return response()->json($msg);
    }

}
