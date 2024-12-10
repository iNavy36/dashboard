package com.example.dashboard.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dashboard.database.AdminRepository;
import com.example.dashboard.database.BoardRepository;
import com.example.dashboard.services.BoardService;
import com.example.dashboard.exceptions.NotFoundException;
import com.example.dashboard.model.Board;
import com.example.dashboard.query_interfaces.BoardShortened;
import com.fasterxml.jackson.annotation.JsonProperty;

@RestController
@RequestMapping("/board")
public class BoardController {
    private final BoardRepository boardRepo;
    private final AdminRepository adminRepo;

    public BoardController(BoardRepository boardRepo, AdminRepository adminRepo) {
        this.boardRepo = boardRepo;
        this.adminRepo = adminRepo;
    }

    @GetMapping
    List<BoardShortened> all() {
        return BoardService.getAllBoards(this.boardRepo.getAllBoards());
    }

    @GetMapping("/{id}")
    BoardShortened one(@PathVariable Long id) {
        return BoardService.getSingleBoard(this.boardRepo.getSingleBoard(id))
                .orElseThrow(() -> new NotFoundException("board", id));
    }

    @PostMapping(consumes = "application/json")
    BoardShortened newBoard(@RequestBody BoardForm board) {
        System.out.println("----" + board.getBoardTitle() + "----" + board.getUserId() + "----");
        if (!adminRepo.existsByUserId(board.getUserId()))
            throw new NotFoundException("admin", board.getUserId(), "No admin with user ID");
        return BoardService.convertToBoardShortened(
                boardRepo.save(new Board(board.getBoardTitle(), adminRepo.getByUserId(board.getUserId()))));
    }

    @PutMapping(consumes = "application/json", value = "/{id}")
    BoardShortened updateBoard(@RequestBody BoardForm board, @PathVariable Long id) {
        if (!adminRepo.existsByUserId(board.getUserId()))
            throw new NotFoundException("admin", board.getUserId(), "No admin with user ID");
        Optional<Board> existingBoard = boardRepo.findById(id);
        if (existingBoard.isPresent()) {
            Board updatedBoard = existingBoard.get();
            updatedBoard.setName(board.getBoardTitle());
            return BoardService.convertToBoardShortened(boardRepo.save(updatedBoard));
        } else {
            throw new NotFoundException("board", id);
        }
    }

    @DeleteMapping(consumes = "application/json", value = "/{id}")
    Boolean deleteBoard(@RequestBody BoardForm board, @PathVariable Long id) {
        if (!adminRepo.existsByUserId(board.getUserId()))
            throw new NotFoundException("admin", board.getUserId(), "No admin with user ID");
        boardRepo.deleteById(id);
        return true;
    }

}

class BoardForm {
    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("board_title")
    private String boardTitle;

    public BoardForm(Long userId, String boardTitle) {
        this.userId = userId;
        this.boardTitle = boardTitle;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getBoardTitle() {
        return boardTitle;
    }

    public void setBoardTitle(String boardTitle) {
        this.boardTitle = boardTitle;
    }
}
